import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { contactById } from '../data/mockData';
import ConvoHeader from '../components/ConvoHeader';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import ContactInfoPanel from '../components/ContactInfoPanel';
import { dayLabel, themedWallpaper } from '../utils';

export default function GroupConversation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { groups, sendMessage, markRead, togglePin, toggleMute, mutedChats, toggleArchive, deleteChat, starred, toggleStar, wallpaper, resolvedTheme } = useApp();
  const [infoOpen, setInfoOpen] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { markRead(id, 'group'); }, [id, markRead]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [id, groups]);
  useEffect(() => { setInfoOpen(false); }, [id]);

  const convo = groups.find((g) => g.id === id);
  if (!convo) return <div className="flex-1 grid place-items-center text-slate-400">Group not found</div>;

  const groupedByDay = [];
  let lastDay = null;
  for (const m of convo.messages) {
    const label = dayLabel(m.time);
    if (label !== lastDay) { groupedByDay.push({ type: 'day', label, key: `day-${m.id}` }); lastDay = label; }
    groupedByDay.push({ type: 'msg', message: m });
  }

  const handleSend = (payload) => {
    sendMessage(id, 'group', { id: `m${Date.now()}`, from: 'me', time: Date.now(), status: 'sent', ...payload });
  };

  const starredMessages = convo.messages.filter((m) => starred.includes(`${id}:${m.id}`));

  return (
    <div className="flex flex-1 min-w-0 h-full">
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <ConvoHeader
          name={convo.name}
          avatar={convo.avatar}
          subtitle={`${convo.members.map((mid) => contactById(mid)?.name.split(' ')[0]).filter(Boolean).join(', ')}`}
          onBack={() => navigate('/groups')}
          onInfoClick={() => setInfoOpen((v) => !v)}
          onCall={() => {}}
          pinned={convo.pinned}
          onPin={() => togglePin(id, 'group')}
          muted={mutedChats.includes(id)}
          onMute={() => toggleMute(id)}
          onArchive={() => { toggleArchive(id, 'group'); navigate('/groups'); }}
          onDelete={() => { deleteChat(id, 'group'); navigate('/groups'); }}
        />

        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-2.5" style={{ backgroundColor: themedWallpaper(wallpaper, resolvedTheme === 'dark') }}>
          {convo.messages.length === 0 && (
            <div className="flex-1 grid place-items-center text-slate-400 text-sm px-6 text-center">No messages yet. Say hi to the group 👋</div>
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
                senderName={item.message.from !== 'me' ? contactById(item.message.from)?.name : null}
                starred={starred.includes(`${id}:${item.message.id}`)}
                onToggleStar={() => toggleStar(id, item.message.id)}
              />
            )
          )}
          <div ref={bottomRef} />
        </div>

        <MessageInput onSend={handleSend} />
      </div>

      {infoOpen && (
        <ContactInfoPanel
          convo={convo}
          onClose={() => setInfoOpen(false)}
          muted={mutedChats.includes(id)}
          onMute={() => toggleMute(id)}
          onDelete={() => { deleteChat(id, 'group'); navigate('/groups'); }}
          starredMessages={starredMessages}
        />
      )}
    </div>
  );
}
