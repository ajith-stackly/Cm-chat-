import { useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Avatar from '../components/Avatar';
import EmptyState from '../components/EmptyState';
import ThemeModal from '../components/ThemeModal';
import ShortcutsModal from '../components/ShortcutsModal';
import {
  BellIcon, LockIcon, ShieldIcon, PaletteIcon, ImageIcon, InfoIcon, KeyboardIcon, HelpIcon, ChevronRightIcon,
} from '../assets/icons/Icons';

const rows = [
  { to: '/settings/notifications', icon: BellIcon, label: 'Notifications' },
  { to: '/settings/privacy', icon: LockIcon, label: 'Privacy' },
  { to: '/settings/security', icon: ShieldIcon, label: 'Security' },
  { action: 'theme', icon: PaletteIcon, label: 'Theme' },
  { to: '/settings/wallpaper', icon: ImageIcon, label: 'Chat Wallpaper' },
  { to: '/settings/account-info', icon: InfoIcon, label: 'Request Account Info' },
  { action: 'shortcuts', icon: KeyboardIcon, label: 'Keyboard shortcuts' },
  { to: '/settings/help', icon: HelpIcon, label: 'Help' },
];

export default function SettingsPage() {
  const { profile, theme, setTheme } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const detailActive = location.pathname !== '/settings' && location.pathname !== '/settings/';
  const helpActive = location.pathname === '/settings/help';
  const accountInfoActive = location.pathname === '/settings/account-info';
  const detailInSettingsPane = helpActive || accountInfoActive;
  const [themeOpen, setThemeOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  return (
    <div className="flex flex-1 min-w-0 h-full">
      <div className={`w-full ${detailInSettingsPane ? 'md:w-[340px]' : 'md:w-[360px]'} shrink-0 flex flex-col border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 ${detailActive && !detailInSettingsPane ? 'hidden md:flex' : 'flex'}`}>
        {detailInSettingsPane ? (
          <Outlet key={params['*']} />
        ) : (
          <>
            <div className="px-4 pt-4 pb-2">
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Settings</h1>
            </div>

            <button
              onClick={() => navigate('/settings/profile')}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left"
            >
              <Avatar src={profile.avatar} name={profile.name} size={52} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-800 dark:text-slate-100 truncate">{profile.name}</p>
                <p className="text-[13px] text-slate-400 truncate">{profile.about}</p>
              </div>
            </button>

            <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />

            <div className="flex-1 overflow-y-auto py-1">
              {rows.map((r) => (
                <button
                  key={r.label}
                  onClick={() => (r.action === 'theme' ? setThemeOpen(true) : r.action === 'shortcuts' ? setShortcutsOpen(true) : navigate(r.to))}
                  className="w-full flex items-center gap-3.5 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left text-slate-700 dark:text-slate-200"
                >
                  <r.icon size={18} className="text-slate-500 dark:text-slate-400 shrink-0" />
                  <span className="flex-1 text-[14px]">{r.label}</span>
                  <ChevronRightIcon size={16} className="text-slate-300" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className={`flex-1 min-w-0 ${detailInSettingsPane ? 'hidden md:flex' : detailActive ? 'flex' : 'hidden md:flex'}`}>
        {detailInSettingsPane ? <EmptyState hint="Select a conversation or start a new one" /> : (
          <>
            <Outlet key={params['*']} /> {detailActive ? null : <EmptyState hint="Select a conversation or start a new one" />}
          </>
        )}
      </div>

      {!detailActive && <div className="hidden">{/* placeholder to keep EmptyState only path */}</div>}

      <ThemeModal open={themeOpen} onClose={() => setThemeOpen(false)} current={theme} onApply={setTheme} />
      <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  );
}
