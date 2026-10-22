import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { contactById } from '../data/mockData';
import { previewText, lastTime } from '../utils';
import ListItem from '../components/ListItem';
import EmptyState from '../components/EmptyState';
import { BackIcon } from '../assets/icons/Icons';

export default function ArchivedPage() {
  const { chats, mutedChats } = useApp();
  const { id } = useParams();
  const navigate = useNavigate();
  const archived = chats.filter((c) => c.archived);

  return (
    <div className="flex flex-1 min-w-0 h-full">
      <div className={`w-full md:w-[360px] shrink-0 flex flex-col border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 ${id ? 'hidden md:flex' : 'flex'}`}>
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <button onClick={() => navigate('/chats')} className="text-slate-500 dark:text-slate-300">
            <BackIcon size={20} />
          </button>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Archived</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {archived.map((c) => {
            const contact = contactById(c.contactId);
            if (!contact) return null;
            return (
              <ListItem
                key={c.id}
                avatar={contact.avatar}
                name={contact.name}
                online={contact.online}
                lastMessage={previewText(c)}
                lastTime={lastTime(c)}
                unread={c.unread}
                pinned={c.pinned}
                muted={mutedChats.includes(c.id)}
                active={id === c.id}
                onClick={() => navigate(`/archived/${c.id}`)}
              />
            );
          })}
          {archived.length === 0 && <p className="text-center text-sm text-slate-400 py-10 px-6">No archived chats</p>}
        </div>
      </div>
      <div className={`flex-1 min-w-0 ${id ? 'flex' : 'hidden md:flex'}`}>
        {id ? <Outlet /> : <EmptyState hint="Select an archived chat to view messages" />}
      </div>
    </div>
  );
}
