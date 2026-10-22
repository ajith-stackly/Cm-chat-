import { useState, useRef, useEffect } from 'react';
import Avatar from './Avatar';
import { BackIcon, VideoIcon, CallOutIcon, SearchIcon, DotsIcon, BellOffIcon, TrashIcon, BlockIcon, PinIcon, ArchiveIcon } from '../assets/icons/Icons';

export default function ConvoHeader({
  name, avatar, online, subtitle, onBack, onInfoClick, onCall, onSearch,
  onMute, muted, onDelete, onBlock, onPin, pinned, onArchive,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div className="flex items-center gap-3 px-3 sm:px-4 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shrink-0">
      <button onClick={onBack} className="md:hidden text-slate-500 dark:text-slate-300 -ml-1">
        <BackIcon size={22} />
      </button>
      <button onClick={onInfoClick} className="flex items-center gap-2.5 min-w-0 flex-1 text-left">
        <Avatar src={avatar} name={name} size={38} online={online} />
        <div className="min-w-0">
          <p className="font-semibold text-slate-800 dark:text-slate-100 truncate text-[14.5px]">{name}</p>
          <p className="text-[12px] text-slate-400 truncate">{subtitle}</p>
        </div>
      </button>
      <div className="flex items-center gap-1 sm:gap-2 text-slate-500 dark:text-slate-300">
        <button onClick={() => onCall?.('video')} className="w-9 h-9 grid place-items-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" title="Video call">
          <VideoIcon size={19} />
        </button>
        <button onClick={() => onCall?.('voice')} className="w-9 h-9 grid place-items-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hidden sm:grid" title="Voice call">
          <CallOutIcon size={17} />
        </button>
        <button onClick={onSearch} className="w-9 h-9 grid place-items-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hidden sm:grid" title="Search in chat">
          <SearchIcon size={17} />
        </button>
        <div className="relative" ref={menuRef}>
          <button onClick={() => setMenuOpen((v) => !v)} className="w-9 h-9 grid place-items-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" title="More">
            <DotsIcon size={18} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-11 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1.5 z-30 animate-popIn origin-top-right">
              <MenuRow icon={PinIcon} label={pinned ? 'Unpin chat' : 'Pin chat'} onClick={() => { onPin?.(); setMenuOpen(false); }} />
              <MenuRow icon={BellOffIcon} label={muted ? 'Unmute notifications' : 'Mute notifications'} onClick={() => { onMute?.(); setMenuOpen(false); }} />
              <MenuRow icon={ArchiveIcon} label="Archive chat" onClick={() => { onArchive?.(); setMenuOpen(false); }} />
              <MenuRow icon={BlockIcon} label="Block" danger onClick={() => { onBlock?.(); setMenuOpen(false); }} />
              <MenuRow icon={TrashIcon} label="Delete chat" danger onClick={() => { onDelete?.(); setMenuOpen(false); }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MenuRow({ icon: Icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 text-[13.5px] hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors ${
        danger ? 'text-red-500' : 'text-slate-600 dark:text-slate-200'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}
