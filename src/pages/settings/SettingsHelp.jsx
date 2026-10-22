import { useState } from 'react';
import SettingsSubHeader from '../../components/SettingsSubHeader';
import fingerprint from '../../assets/images/fingerprint.png';

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
  const [active, setActive] = useState('');

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full bg-white dark:bg-slate-900">
      <SettingsSubHeader title="Help" />
      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-md">
        <div className="flex flex-col items-center text-center mb-6">
                    <div className="mb-3 grid h-20 w-20 place-items-center rounded-full bg-[#5B96F7] ring-2 ring-[#86b0ff] shadow-inner shadow-white/20">
                      <span
            role="img"
            aria-label="Fingerprint"
            className="block h-10 w-10 bg-white"
            style={{
              WebkitMaskImage: `url(${fingerprint})`,
              maskImage: `url(${fingerprint})`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
            }}
          />
          </div>
        </div>

        <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-800">
          {rows.map((r) => {
            const open = active === r.label;

            return (
              <div key={r.label} className="py-1">
                <button
                  type="button"
                  onClick={() => setActive(open ? '' : r.label)}
                  className="flex w-full items-center justify-between py-3 text-left text-[14px] text-slate-700 dark:text-slate-200 hover:text-brand-600"
                  aria-expanded={open}
                >
                  <span>{r.label}</span>
                </button>

                {open && (
                  <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
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
