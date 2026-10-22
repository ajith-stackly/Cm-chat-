import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState, useCallback } from 'react';
import { initialChats, initialGroups, me, statusUpdates as initialStatusUpdates } from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEY = 'wisp-chat-state-v1';
const THEMES = ['light', 'dark', 'system'];

const systemPrefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return null;
}

export function AppProvider({ children }) {
  const persisted = loadPersisted();

  const [chats, setChats] = useState(persisted?.chats || initialChats);
  const [groups, setGroups] = useState(persisted?.groups || initialGroups);
  const [statusUpdates, setStatusUpdates] = useState(persisted?.statusUpdates || initialStatusUpdates);
  const [theme, setThemeState] = useState(THEMES.includes(persisted?.theme) ? persisted.theme : 'light');
  // The theme that is actually showing right now ('light' | 'dark'), even when theme === 'system'
  const [resolvedTheme, setResolvedTheme] = useState(
    theme === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : theme
  );
  const setTheme = useCallback((t) => {
    if (THEMES.includes(t)) setThemeState(t);
  }, []);
  const [wallpaper, setWallpaper] = useState(persisted?.wallpaper || '#E9EAF2');
  const savedProfile = persisted?.profile;
  const savedAvatar = typeof savedProfile?.avatar === 'string' ? savedProfile.avatar : '';
  const profileFromSavedState = savedProfile && savedAvatar.includes('/assets/images/avatars/me.png')
    ? { ...savedProfile, avatar: me.avatar }
    : savedProfile;
  const [profile, setProfile] = useState(profileFromSavedState || me);
  const [starred, setStarred] = useState(persisted?.starred || []);
  const [mutedChats, setMutedChats] = useState(persisted?.mutedChats || []);
  const [blocked, setBlocked] = useState(persisted?.blocked || []);
  const [notificationSettings, setNotificationSettings] = useState(
    persisted?.notificationSettings || {
      messageNotif: true, showPreviews: true, reactionNotif: true, incomingRingtone: false, sounds: true,
    }
  );
  const [privacy, setPrivacy] = useState(
    persisted?.privacy || { lastSeen: 'Everyone', profilePhoto: 'Everyone', about: 'Everyone', readReceipts: true, groups: 'Everyone' }
  );

  // Apply theme class to <html> (layout effect = no flash of the wrong theme)
  useLayoutEffect(() => {
    const root = document.documentElement;
    const apply = (mode) => {
      root.classList.toggle('dark', mode === 'dark');
      root.style.colorScheme = mode;
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', mode === 'dark' ? '#0f172a' : '#4f6df5');
      setResolvedTheme(mode);
    };
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      apply(mq.matches ? 'dark' : 'light');
      const listener = (e) => apply(e.matches ? 'dark' : 'light');
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
    apply(theme);
    return undefined;
  }, [theme]);

  // Persist
  useEffect(() => {
    const data = { chats, groups, statusUpdates, theme, wallpaper, profile, starred, mutedChats, blocked, notificationSettings, privacy };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore quota errors */
    }
  }, [chats, groups, statusUpdates, theme, wallpaper, profile, starred, mutedChats, blocked, notificationSettings, privacy]);

  const addStatus = useCallback((slides, caption) => {
    setStatusUpdates((previous) => {
      const ownStatus = previous.find((status) => status.isMine);
      const newSlides = slides.map((image, index) => ({
        id: `sl${Date.now()}-${index}`,
        image,
        caption,
        time: 'now',
      }));

      if (ownStatus) {
        return previous.map((status) => status.id === ownStatus.id
          ? { ...status, viewed: false, slides: [...status.slides, ...newSlides] }
          : status);
      }

      return [{
        id: `s${Date.now()}`,
        contactId: 'me',
        viewed: false,
        isMine: true,
        slides: newSlides,
      }, ...previous];
    });
  }, [setStatusUpdates]);

  const editStatus = useCallback((statusId, slides, caption) => {
    setStatusUpdates((previous) => previous.map((status) => (
      status.id === statusId && status.isMine
        ? {
            ...status,
            viewed: false,
            slides: slides.map((image, index) => ({
              id: `sl${Date.now()}-${index}`,
              image,
              caption,
              time: 'now',
            })),
          }
        : status
    )));
  }, [setStatusUpdates]);

  const deleteStatus = useCallback((statusId) => {
    setStatusUpdates((previous) => previous.filter((status) => status.id !== statusId));
  }, [setStatusUpdates]);

  const markStatusViewed = useCallback((statusId) => {
    setStatusUpdates((previous) => previous.map((status) => (
      status.id === statusId ? { ...status, viewed: true } : status
    )));
  }, [setStatusUpdates]);

  const findConvo = useCallback((id, type) => {
    const list = type === 'group' ? groups : chats;
    return list.find((c) => c.id === id);
  }, [chats, groups]);

  const sendMessage = useCallback((convoId, type, message) => {
    const setter = type === 'group' ? setGroups : setChats;
    setter((prev) => prev.map((c) => (c.id === convoId ? { ...c, messages: [...c.messages, message] } : c)));
  }, [setChats, setGroups]);

  const ensureChat = useCallback((contactId) => {
    setChats((prev) => {
      if (prev.some((c) => c.id === contactId)) return prev;
      return [...prev, { id: contactId, type: 'dm', contactId, pinned: false, unread: 0, archived: false, messages: [] }];
    });
    return contactId;
  }, [setChats]);

  const togglePin = useCallback((convoId, type) => {
    const setter = type === 'group' ? setGroups : setChats;
    setter((prev) => prev.map((c) => (c.id === convoId ? { ...c, pinned: !c.pinned } : c)));
  }, [setChats, setGroups]);

  const toggleArchive = useCallback((convoId, type) => {
    const setter = type === 'group' ? setGroups : setChats;
    setter((prev) => prev.map((c) => (c.id === convoId ? { ...c, archived: !c.archived } : c)));
  }, [setChats, setGroups]);

  const toggleMute = useCallback((convoId) => {
    setMutedChats((prev) => (prev.includes(convoId) ? prev.filter((id) => id !== convoId) : [...prev, convoId]));
  }, [setMutedChats]);

  const markRead = useCallback((convoId, type) => {
    const setter = type === 'group' ? setGroups : setChats;
    setter((prev) => prev.map((c) => (c.id === convoId ? { ...c, unread: 0 } : c)));
  }, [setChats, setGroups]);

  const deleteChat = useCallback((convoId, type) => {
    const setter = type === 'group' ? setGroups : setChats;
    setter((prev) => prev.filter((c) => c.id !== convoId));
  }, [setChats, setGroups]);

  const toggleStar = useCallback((convoId, messageId) => {
    const key = `${convoId}:${messageId}`;
    setStarred((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }, [setStarred]);

  const createGroup = useCallback((name, memberIds, avatarOverride) => {
    const id = `g${Date.now()}`;
    const newGroup = {
      id, type: 'group', name, members: memberIds,
      avatar: avatarOverride || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      pinned: false, unread: 0, archived: false, messages: [],
    };
    setGroups((prev) => [newGroup, ...prev]);
    return id;
  }, [setGroups]);

  const toggleBlock = useCallback((contactId) => {
    setBlocked((prev) => (prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId]));
  }, [setBlocked]);

  const value = useMemo(() => ({
    chats, groups, statusUpdates, addStatus, editStatus, deleteStatus, markStatusViewed,
    theme, setTheme, resolvedTheme, wallpaper, setWallpaper, profile, setProfile,
    starred, toggleStar, mutedChats, toggleMute, blocked, toggleBlock,
    notificationSettings, setNotificationSettings, privacy, setPrivacy,
    findConvo, sendMessage, togglePin, toggleArchive, markRead, deleteChat, createGroup, ensureChat,
  }), [chats, groups, statusUpdates, addStatus, editStatus, deleteStatus, markStatusViewed, theme, setTheme, resolvedTheme, wallpaper, setWallpaper, profile, setProfile, starred, mutedChats, blocked, notificationSettings, setNotificationSettings, privacy, setPrivacy,
    findConvo, sendMessage, togglePin, toggleArchive, markRead, deleteChat, createGroup, toggleStar, toggleMute, toggleBlock, ensureChat]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
