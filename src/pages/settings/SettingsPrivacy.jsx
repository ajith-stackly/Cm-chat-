import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SettingsSubHeader from '../../components/SettingsSubHeader';
import { ChevronRightIcon } from '../../assets/icons/Icons';

const rows = [
  { to: 'last-seen', key: 'lastSeen', label: 'Last Seen' },
  { to: 'profile-photo', key: 'profilePhoto', label: 'Profile Photo' },
  { to: 'about', key: 'about', label: 'About' },
];

export default function SettingsPrivacy() {
  const navigate = useNavigate();
  const { privacy, setPrivacy } = useApp();

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full bg-white dark:bg-slate-900">
      <SettingsSubHeader title="Privacy" />
      <div className="flex-1 overflow-y-auto max-w-lg">
        {rows.map((r) => (
          <button
            key={r.key}
            onClick={() => navigate(r.to)}
            className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-left"
          >
            <span className="text-[14px] text-slate-700 dark:text-slate-200">{r.label}</span>
            <span className="flex items-center gap-1.5 text-slate-400 text-[13px]">
              {privacy[r.key]}
              <ChevronRightIcon size={15} />
            </span>
          </button>
        ))}

        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[14px] text-slate-700 dark:text-slate-200">Read receipts</p>
            <p className="text-xs text-slate-400 mt-0.5 max-w-sm">
              If turned off, you won't send or receive read receipts. Read receipts are always sent for group chats.
            </p>
          </div>
          <Toggle checked={privacy.readReceipts} onChange={() => setPrivacy((p) => ({ ...p, readReceipts: !p.readReceipts }))} />
        </div>

        <button
          onClick={() => navigate('/settings/privacy/blocked')}
          className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-left"
        >
          <span className="text-[14px] text-slate-700 dark:text-slate-200">Blocked contacts</span>
          <ChevronRightIcon size={15} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button onClick={onChange} className={`w-10 h-[22px] rounded-full relative transition-colors shrink-0 ${checked ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
      <span className={`absolute top-0.5 w-[18px] h-[18px] rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-[20px]' : 'translate-x-0.5'}`} />
    </button>
  );
}
