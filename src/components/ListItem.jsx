import Avatar from './Avatar';
import { PinIcon, CheckCheckIcon } from '../assets/icons/Icons';

function timeLabel(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const yest = new Date(now);
  yest.setDate(now.getDate() - 1);
  if (d.toDateString() === yest.toDateString()) return 'Yesterday';
  return d.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
}

export default function ListItem({ avatar, name, online, lastMessage, lastTime, unread, pinned, active, muted, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors ${
        active ? 'bg-brand-500 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800/70'
      }`}
    >
      <Avatar src={avatar} name={name} size={46} online={online} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className={`font-medium truncate text-[14.5px] ${active ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>{name}</p>
          <span className={`text-[11px] shrink-0 ${active ? 'text-white/80' : 'text-slate-400'}`}>{timeLabel(lastTime)}</span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className={`truncate text-[13px] ${active ? 'text-white/85' : 'text-slate-500 dark:text-slate-400'}`}>
            {lastMessage}
          </p>
          <div className="flex items-center gap-1 shrink-0">
            {pinned && <PinIcon size={13} className={active ? 'text-white/80' : 'text-slate-400'} />}
            {muted && <span className={`text-[10px] ${active ? 'text-white/80' : 'text-slate-400'}`}>🔕</span>}
            {unread > 0 && (
              <span className={`min-w-[19px] h-[19px] px-1 rounded-full text-[11px] font-semibold grid place-items-center ${
                active ? 'bg-white text-brand-600' : 'bg-brand-500 text-white'
              }`}>
                {unread}
              </span>
            )}
            {badge}
          </div>
        </div>
      </div>
    </button>
  );
}
