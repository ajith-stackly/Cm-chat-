import { useMemo, useState } from 'react';
import { Outlet, useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { contactById } from '../data/mockData';
import { previewText, lastTime } from '../utils';
import ListItem from '../components/ListItem';
import EmptyState from '../components/EmptyState';
import NewChatModal from '../components/NewChatModal';
import { SearchIcon, FilterIcon, ArchiveIcon, PlusIcon, ChevronDownIcon } from '../assets/icons/Icons';

const FILTERS = ['All', 'Unread', 'Favourites', 'Groups'];

export default function ChatsPage() {
  const { chats, mutedChats, starred } = useApp();
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [params, setParams] = useSearchParams();
  const [newChatOpen, setNewChatOpen] = useState(false);
  const filter = params.get('filter') || 'All';

  const visible = chats.filter((c) => !c.archived);

  const filtered = useMemo(() => {
    let list = visible.filter((c) => {
      const contact = contactById(c.contactId);
      return contact?.name.toLowerCase().includes(search.toLowerCase());
    });
    if (filter === 'Unread') list = list.filter((c) => c.unread > 0);
    if (filter === 'Favourites') list = list.filter((c) => c.pinned);
    return list;
  }, [visible, search, filter]);

  const pinned = filtered.filter((c) => c.pinned);
  const rest = filtered.filter((c) => !c.pinned);
  const archivedCount = chats.filter((c) => c.archived).length;

  const headerTitle = filter === 'All' ? 'Chats' : filter;

  return (
    <div className="flex flex-1 min-w-0 h-full">
      <div className={`w-full md:w-[360px] shrink-0 flex flex-col border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 ${id ? 'hidden md:flex' : 'flex'}`}>
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">{headerTitle}</h1>
          <button onClick={() => setNewChatOpen(true)} title="New chat" className="w-9 h-9 grid place-items-center rounded-full text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-800 dark:text-brand-400">
            <PlusIcon size={19} />
          </button>
        </div>

        <div className="px-4 pb-2 flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 flex-1">
            <SearchIcon size={16} className="text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="bg-transparent outline-none flex-1 text-[13.5px] text-slate-700 dark:text-slate-100 placeholder:text-slate-400 min-w-0"
            />
          </div>
          <div className="relative shrink-0">
            <button onClick={() => setFilterOpen((v) => !v)} className="w-9 h-9 grid place-items-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300">
              <FilterIcon size={16} />
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-11 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1.5 z-30 animate-popIn origin-top-right">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => { setParams(f === 'All' ? {} : { filter: f }); setFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 dark:hover:bg-slate-700/60 ${filter === f ? 'text-brand-600 dark:text-brand-400 font-medium' : 'text-slate-600 dark:text-slate-200'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <Link to="/archived" className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-brand-600 dark:text-brand-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800/60">
          <ArchiveIcon size={16} />
          Archived
          {archivedCount > 0 && <span className="text-slate-400 font-normal">{archivedCount}</span>}
        </Link>

        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {pinned.length > 0 && (
            <>
              <p className="px-2.5 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Pinned</p>
              {pinned.map((c) => (
                <Row key={c.id} convo={c} active={id === c.id} muted={mutedChats.includes(c.id)} onClick={() => navigate(`/chats/${c.id}`)} />
              ))}
            </>
          )}
          {rest.length > 0 && (
            <>
              <p className="px-2.5 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{pinned.length ? 'All Chats' : ''}</p>
              {rest.map((c) => (
                <Row key={c.id} convo={c} active={id === c.id} muted={mutedChats.includes(c.id)} onClick={() => navigate(`/chats/${c.id}`)} />
              ))}
            </>
          )}
          {filtered.length === 0 && (
            <p className="text-center text-sm text-slate-400 py-10 px-6">No chats found. Start a new conversation!</p>
          )}
        </div>
      </div>

      <div className={`flex-1 min-w-0 ${id ? 'flex' : 'hidden md:flex'}`}>
        {id ? <Outlet /> : <EmptyState onLinkClick={() => setNewChatOpen(true)} />}
      </div>

      <NewChatModal
        open={newChatOpen}
        onClose={() => setNewChatOpen(false)}
        title="New chat"
        onPick={(contactId) => {
          const existing = chats.find((c) => c.contactId === contactId);
          navigate(`/chats/${existing ? existing.id : contactId}`);
        }}
      />
    </div>
  );
}

function Row({ convo, active, muted, onClick }) {
  const contact = contactById(convo.contactId);
  if (!contact) return null;
  return (
    <ListItem
      avatar={contact.avatar}
      name={contact.name}
      online={contact.online}
      lastMessage={previewText(convo)}
      lastTime={lastTime(convo)}
      unread={convo.unread}
      pinned={convo.pinned}
      muted={muted}
      active={active}
      onClick={onClick}
    />
  );
}
