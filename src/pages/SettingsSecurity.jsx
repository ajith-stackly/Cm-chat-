function StatusRingIcon({ size = 28, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.7" strokeDasharray="1.6 2.2" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

const items = [
  {
    label: 'Text and voice messages',
    icon: (props) => (
      <svg viewBox="0 0 24 24" width={props.size || 28} height={props.size || 28} {...props} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 11.5a7 7 0 1 1 3.2 6.1L5 19l1.4-3.4A7 7 0 0 1 5 11.5Z" />
        <circle cx="9" cy="11.8" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="11.8" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="11.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  { label: 'Audio & Video Calls', icon: (props) => (
      <svg viewBox="0 0 24 24" width={props.size || 28} height={props.size || 28} {...props} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5.5 4h3l1.5 4-2 1.6a12 12 0 0 0 6.4 6.4l1.6-2 4 1.5v3c0 1-.9 1.8-1.9 1.6C10.7 19.1 4.9 13.3 3.9 6.4 3.7 5.3 4.5 4.4 5.5 4Z" />
      </svg>
    ) },
  { label: 'Photos, videos & documents', icon: (props) => (
      <svg viewBox="0 0 24 24" width={props.size || 28} height={props.size || 28} {...props} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
        <path d="M14 3v4h4" />
      </svg>
    ) },
  { label: 'Location Sharing', icon: (props) => (
      <svg viewBox="0 0 24 24" width={props.size || 28} height={props.size || 28} {...props} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ) },
  { label: 'Status Updates', icon: StatusRingIcon },
];

export default function SettingsSecurity() {
  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-white dark:bg-slate-900">
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Security</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-5">
        <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
          {items.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4 py-4 pl-1">
              <span className="flex h-8 w-8 items-center justify-center text-slate-700 dark:text-slate-200">
                {typeof Icon === 'function' ? <Icon size={28} className="shrink-0" /> : <Icon size={28} className="shrink-0" />}
              </span>
              <span className="text-[18px] font-medium leading-6 tracking-[-0.01em] text-slate-700 dark:text-slate-200">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
