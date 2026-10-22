import { useState } from 'react';
import { HelpIcon, ChevronRightIcon } from '../assets/icons/Icons';

const rows = [
  {
    label: 'Help Center',
    content: 'Find setup steps, troubleshooting tips, and quick answers to common questions about your account and chats.',
  },
  {
    label: 'Contact Us',
    content: 'Reach out to support for account issues, billing questions, and technical help with the app.',
  },
  {
    label: 'Licenses',
    content: 'Review software licenses and third-party dependencies used in this application.',
  },
  {
    label: 'Terms and Privacy Policy',
    content: 'Read the privacy policy, usage terms, and the rules that govern your data and conversations.',
  },
];

export default function SettingsHelp() {
  const [active, setActive] = useState(rows[0].label);

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 overflow-y-auto">
      <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Help</h2>
      </div>
      <div className="p-6 max-w-lg">
        <div className="w-16 h-16 rounded-full bg-brand-500 grid place-items-center mb-5">
          <HelpIcon size={26} className="text-white" />
        </div>
        <div className="flex flex-col">
          {rows.map((r) => {
            const open = active === r.label;

            return (
              <div key={r.label} className="border-b border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActive(open ? '' : r.label)}
                  className="w-full flex items-center justify-between py-3 text-left text-sm text-slate-700 dark:text-slate-200"
                >
                  {r.label}
                  <ChevronRightIcon size={15} className={`text-slate-300 transition-transform ${open ? 'rotate-90' : ''}`} />
                </button>

                {open && (
                  <div className="mb-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {r.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
