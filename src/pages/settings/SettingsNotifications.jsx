import { useApp } from '../../context/AppContext';
import SettingsSubHeader from '../../components/SettingsSubHeader';

const rows = [
  { key: 'messageNotif', label: 'Notifications', desc: 'Show notifications for new messages' },
  { key: 'showPreviews', label: 'Show Previews', desc: '' },
  { key: 'reactionNotif', label: 'Show Reaction Notifications', desc: '' },
  { key: 'incomingRingtone', label: 'Incoming call ringtone', desc: '' },
  { key: 'sounds', label: 'Sounds', desc: 'Play sound for incoming messages' },
];

export default function SettingsNotifications() {
  const { notificationSettings, setNotificationSettings } = useApp();

  const toggle = (key) => setNotificationSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full bg-white dark:bg-slate-900">
      <SettingsSubHeader title="Notifications" />
      <div className="flex-1 overflow-y-auto px-6 py-4 max-w-lg">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
            <div>
              <p className="text-[14px] text-slate-700 dark:text-slate-200">{r.label}</p>
              {r.desc && <p className="text-xs text-slate-400 mt-0.5 max-w-xs">{r.desc}</p>}
            </div>
            <Toggle checked={notificationSettings[r.key]} onChange={() => toggle(r.key)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-10 h-[22px] rounded-full relative transition-colors shrink-0 ${checked ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700'}`}
    >
      <span className={`absolute top-0.5 w-[18px] h-[18px] rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-[20px]' : 'translate-x-0.5'}`} />
    </button>
  );
}
