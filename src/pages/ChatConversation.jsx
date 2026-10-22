import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { contactById } from '../data/mockData';
import ConvoHeader from '../components/ConvoHeader';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import ContactInfoPanel from '../components/ContactInfoPanel';
import CallOverlay from '../components/CallOverlay';
import { dayLabel, themedWallpaper } from '../utils';

export default function ChatConversation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    chats, profile, sendMessage, ensureChat, markRead, togglePin, toggleMute, mutedChats,
    toggleArchive, deleteChat, toggleBlock, blocked, starred, toggleStar, wallpaper, resolvedTheme,
  } = useApp();
  const [infoOpen, setInfoOpen] = useState(false);
  const [call, setCall] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => { ensureChat(id); }, [id, ensureChat]);
  useEffect(() => { markRead(id, 'dm'); }, [id, markRead]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [id, chats]);
  useEffect(() => { setInfoOpen(false); }, [id]);

  const convo = chats.find((c) => c.id === id);
  const contact = convo ? contactById(convo.contactId) : contactById(id);

  if (!contact) {
    return <div className="flex-1 grid place-items-center text-slate-400">Contact not found</div>;
  }

  const messages = convo?.messages || [];
  const isBlocked = blocked.includes(contact.id);

  const groupedByDay = [];
  let lastDay = null;
  for (const m of messages) {
    const label = dayLabel(m.time);
    if (label !== lastDay) {
      groupedByDay.push({ type: 'day', label, key: `day-${m.id}` });
      lastDay = label;
    }
    groupedByDay.push({ type: 'msg', message: m });
  }

  const handleSend = (payload) => {
    sendMessage(id, 'dm', { id: `m${Date.now()}`, from: 'me', time: Date.now(), status: 'sent', ...payload });
  };

  const starredMessages = messages.filter((m) => starred.includes(`${id}:${m.id}`));

  return (
    <div className="flex flex-1 min-w-0 h-full">
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <ConvoHeader
          name={contact.name}
          avatar={contact.avatar}
          online={contact.online}
          subtitle={isBlocked ? 'Blocked' : contact.online ? 'Online' : contact.lastSeen ? `Last seen ${contact.lastSeen}` : ''}
          onBack={() => navigate('/chats')}
          onInfoClick={() => setInfoOpen((v) => !v)}
          onCall={(type) => setCall({ type })}
          pinned={convo?.pinned}
          onPin={() => togglePin(id, 'dm')}
          muted={mutedChats.includes(id)}
          onMute={() => toggleMute(id)}
          onArchive={() => { toggleArchive(id, 'dm'); navigate('/chats'); }}
          onBlock={() => toggleBlock(contact.id)}
          onDelete={() => { deleteChat(id, 'dm'); navigate('/chats'); }}
        />

        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-2.5" style={{ backgroundColor: themedWallpaper(wallpaper, resolvedTheme === 'dark') }}>
          {messages.length === 0 && (
            <div className="flex-1 grid place-items-center text-slate-400 text-sm px-6 text-center">
              Say hi to {contact.name.split(' ')[0]} 👋 — no messages yet.
            </div>
          )}
          {groupedByDay.map((item) =>
            item.type === 'day' ? (
              <div key={item.key} className="flex items-center justify-center my-1">
                <span className="text-[11px] px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-400 shadow-sm">{item.label}</span>
              </div>
            ) : (
              <MessageBubble
                key={item.message.id}
                message={item.message}
                isMe={item.message.from === 'me'}
                starred={starred.includes(`${id}:${item.message.id}`)}
                onToggleStar={() => toggleStar(id, item.message.id)}
              />
            )
          )}
          <div ref={bottomRef} />
        </div>

        <MessageInput onSend={handleSend} />
      </div>

      {infoOpen && convo && (
        <ContactInfoPanel
          convo={convo}
          onClose={() => setInfoOpen(false)}
          muted={mutedChats.includes(id)}
          onMute={() => toggleMute(id)}
          onDelete={() => { deleteChat(id, 'dm'); navigate('/chats'); }}
          onBlock={() => toggleBlock(contact.id)}
          starredMessages={starredMessages}
          onCall={(type) => setCall({ type })}
        />
      )}

      {call && <CallOverlay call={call} me={profile} contact={contact} onEnd={() => setCall(null)} />}
    </div>
  );
}
