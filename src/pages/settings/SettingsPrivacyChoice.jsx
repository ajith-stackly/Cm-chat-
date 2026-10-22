import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SettingsSubHeader from '../../components/SettingsSubHeader';

const CONFIG = {
  'last-seen': { key: 'lastSeen', title: 'Last Seen', note: "If you don't share your Last Seen, you won't be able to see other people's Last Seen." },
  'profile-photo': { key: 'profilePhoto', title: 'Profile Photo', note: 'Who can see my profile photo' },
  about: { key: 'about', title: 'About', note: 'Who can see my About info' },
};

const OPTIONS = ['Everyone', 'My Contacts', 'Nobody'];

export default function SettingsPrivacyChoice() {
  const { section } = useParams();
  const navigate = useNavigate();
  const { privacy, setPrivacy } = useApp();
  const cfg = CONFIG[section];

  if (!cfg) return null;

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full bg-white dark:bg-slate-900">
      <SettingsSubHeader title={cfg.title} onBack={() => navigate('/settings/privacy')} />
      <div className="flex-1 overflow-y-auto px-6 py-5 max-w-md">
        <p className="text-xs text-slate-400 mb-4">{cfg.note}</p>
        <div className="flex flex-col gap-4">
          {OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer text-[14.5px] text-slate-700 dark:text-slate-200">
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
