import SettingsSubHeader from '../../components/SettingsSubHeader';
import { LockIcon, FileIcon, PhoneIcon, PinIcon } from '../../assets/icons/Icons';

function StatusRingIcon({ size = 20, className = '' }) {
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
      <circle cx="12" cy="12" r="8.5" strokeDasharray="1.6 2.2" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

function MessageIcon({ size = 20, className = '' }) {
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
      <path d="M5 11.8a7 7 0 1 1 3.2 6.1L5 19l1.4-3.5A7 7 0 0 1 5 11.8Z" />
      <circle cx="9" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const items = [
  { label: 'Text and voice messages', icon: MessageIcon },
  { label: 'Audio & Video Calls', icon: PhoneIcon },
  { label: 'Photos, videos & documents', icon: FileIcon },
  { label: 'Location Sharing', icon: PinIcon },
  { label: 'Status Updates', icon: StatusRingIcon },
];

export default function SettingsSecurity() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#f2f4f7] text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <SettingsSubHeader title="Security" />

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="mx-auto flex max-w-[430px] flex-col items-center pt-4 text-center">
          <div className="mb-3 grid h-20 w-20 place-items-center rounded-full bg-[#dfeafc] text-[#5c7efa] ring-2 ring-[#86b0ff] shadow-inner shadow-white/20">
            <LockIcon size={30} />
          </div>

          <h3 className="text-[18px] font-semibold text-slate-800 dark:text-slate-100">Your Chats and calls are private</h3>
          <p className="mt-2 max-w-[330px] text-[12px] leading-5 text-slate-500 dark:text-slate-400">
            End-to-end encryption keeps your personal messages and calls between you and the person you choose to communicate with. Not even WhatsApp can read or listen to them. This is how your private conversations stay secure.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-[430px]">
          {items.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 border-b border-slate-200 py-3 pl-1 text-left last:border-b-0 dark:border-slate-800">
              <span className="flex h-7 w-7 items-center justify-center text-slate-700 dark:text-slate-200">
                <Icon size={20} className="shrink-0" />
              </span>
              <span className="text-[15px] font-medium leading-6 text-slate-700 dark:text-slate-200">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
