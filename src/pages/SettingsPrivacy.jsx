import { useNavigate, Outlet, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EmptyState from '../components/EmptyState';
import { ChevronRightIcon } from '../assets/icons/Icons';

const links = [
  { to: 'last-seen', label: 'Last Seen', key: 'lastSeen' },
  { to: 'profile-photo', label: 'Profile Photo', key: 'profilePhoto' },
  { to: 'about', label: 'About', key: 'about' },
];

export default function SettingsPrivacy() {
  const { privacy, setPrivacy } = useApp();
  const navigate = useNavigate();
  const params = useParams();
  const sub = params['*'];

  return (
    <div className="flex flex-1 min-w-0 h-full">
      <div className={`w-full md:w-[340px] shrink-0 flex flex-col border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto ${sub ? 'hidden md:flex' : 'flex'}`}>
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Privacy</h2>
        </div>
        <div className="flex flex-col">
          {links.map((l) => (
            <button
              key={l.to}
              onClick={() => navigate(l.to)}
              className="w-full flex items-center justify-between px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left"
            >
              <span className="text-sm text-slate-700 dark:text-slate-200">{l.label}</span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                {privacy[l.key]} <ChevronRightIcon size={14} />
              </span>
            </button>
          ))}

          <div className="flex items-center justify-between px-6 py-3">
            <div>
              <p className="text-sm text-slate-700 dark:text-slate-200">Read receipts</p>
              <p className="text-[11px] text-slate-400 mt-0.5 max-w-[220px]">If turned off you won't send or receive read receipts. Read receipts are always sent for group chats.</p>
            </div>
            <button
              onClick={() => setPrivacy((p) => ({ ...p, readReceipts: !p.readReceipts }))}
              className={`w-11 h-6 rounded-full relative shrink-0 transition-colors ${privacy.readReceipts ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${privacy.readReceipts ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
            </button>
          </div>

          <button onClick={() => navigate('groups')} className="w-full flex items-center justify-between px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left">
            <span className="text-sm text-slate-700 dark:text-slate-200">Groups</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">{privacy.groups} <ChevronRightIcon size={14} /></span>
          </button>

          <button onClick={() => navigate('blocked')} className="w-full flex items-center justify-between px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left">
            <span className="text-sm text-slate-700 dark:text-slate-200">Blocked contacts</span>
            <ChevronRightIcon size={14} className="text-slate-400" />
          </button>
        </div>
      </div>
      <div className={`flex-1 min-w-0 ${sub ? 'flex' : 'hidden md:flex'}`}>
        {sub ? <Outlet /> : <EmptyState hint="Select a conversation or start a new one" />}
      </div>
    </div>
  );
}
