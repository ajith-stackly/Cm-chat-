import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { callLog, contactById } from '../data/mockData';
import Avatar from '../components/Avatar';
import EmptyState from '../components/EmptyState';
import NewChatModal from '../components/NewChatModal';
import CallOverlay from '../components/CallOverlay';
import { SearchIcon, PhoneIcon, VideoIcon } from '../assets/icons/Icons';

export default function CallsPage() {
  const { profile } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [call, setCall] = useState(null);
  const [activeContact, setActiveContact] = useState(null);

  const filtered = callLog.filter((l) => {
    const c = contactById(l.contactId);
    return c?.name.toLowerCase().includes(search.toLowerCase());
  });

  const startCall = (contactId, type) => {
    const c = contactById(contactId);
    setActiveContact(c);
    setCall({ type });
    setPickerOpen(false);
  };

  return (
    <div className="flex flex-1 min-w-0 h-full">
      <div className="w-full md:w-[360px] shrink-0 flex flex-col border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Call Log</h1>
        </div>
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2">
            <SearchIcon size={16} className="text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="bg-transparent outline-none flex-1 text-[13.5px] text-slate-700 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>

        <button
          onClick={() => setPickerOpen(true)}
          className="flex items-center justify-between px-4 py-2.5 text-[13.5px] text-brand-600 dark:text-brand-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800/60"
        >
          Start new conversation
          <PhoneIcon size={15} />
        </button>

        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {filtered.map((l) => {
            const c = contactById(l.contactId);
            if (!c) return null;
            return (
              <div
                key={l.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/chats/${c.id}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/chats/${c.id}`);
                  }
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors cursor-pointer"
              >
                <Avatar src={c.avatar} name={c.name} size={46} online={c.online} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[14.5px] text-slate-800 dark:text-slate-100 truncate">{c.name}</p>
                  <div className="flex items-center gap-1 text-[12.5px] text-emerald-500">
                    <span className="rotate-[135deg] inline-block">↗</span>
                    <span className="text-slate-400">{l.time}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); startCall(c.id, l.type); }}
                  className="w-9 h-9 grid place-items-center rounded-full text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 shrink-0"
                  title={`${l.type === 'video' ? 'Video' : 'Voice'} call`}
                >
                  {l.type === 'video' ? <VideoIcon size={18} /> : <PhoneIcon size={16} />}
                </button>
              </div>
            );
          })}
          {filtered.length === 0 && <p className="text-center text-sm text-slate-400 py-10 px-6">No calls found</p>}
        </div>
      </div>

      <EmptyState onLinkClick={() => setPickerOpen(true)} />

      <NewChatModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title="Start new conversation"
        onPick={(contactId) => navigate(`/chats/${contactId}`)}
      />

      {call && activeContact && <CallOverlay call={call} me={profile} contact={activeContact} onEnd={() => setCall(null)} />}
    </div>
  );
}
