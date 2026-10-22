import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const CONFIG = {
  'last-seen': { title: 'Last Seen', key: 'lastSeen', options: ['Everyone', 'My Contacts', 'Nobody'], note: "If you don't share your Last Seen, you won't be able to see other people's Last Seen." },
  'profile-photo': { title: 'Profile Photo', key: 'profilePhoto', options: ['Everyone', 'My Contacts', 'Nobody'] },
  about: { title: 'About', key: 'about', options: ['Everyone', 'My Contacts', 'Nobody'] },
  groups: { title: 'Groups', key: 'groups', options: ['Everyone', 'My Contacts'] },
};

export default function SettingsPrivacyChoice() {
  const { privacy, setPrivacy } = useApp();
  const { pathname } = useLocation();
  const slug = pathname.split('/').pop();
  const cfg = CONFIG[slug] || CONFIG['last-seen'];

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 overflow-y-auto">
      <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{cfg.title}</h2>
      </div>
      <div className="p-6 max-w-md">
        {cfg.note && <p className="text-xs text-slate-400 mb-5">{cfg.note}</p>}
        <div className="flex flex-col gap-4">
          {cfg.options.map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer text-sm text-slate-700 dark:text-slate-200">
              <input
                type="radio"
                checked={privacy[cfg.key] === opt}
                onChange={() => setPrivacy((p) => ({ ...p, [cfg.key]: opt }))}
                className="w-4 h-4 accent-brand-500"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
