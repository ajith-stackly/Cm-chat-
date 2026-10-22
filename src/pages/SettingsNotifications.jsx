import { useApp } from '../context/AppContext';

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
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 overflow-y-auto">
      <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Notifications</h2>
      </div>
      <div className="p-6 max-w-lg flex flex-col gap-5">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-700 dark:text-slate-200">{r.label}</p>
              {r.desc && <p className="text-xs text-slate-400 mt-0.5">{r.desc}</p>}
            </div>
            <button
              onClick={() => toggle(r.key)}
              className={`w-11 h-6 rounded-full relative shrink-0 transition-colors ${notificationSettings[r.key] ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${notificationSettings[r.key] ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
