import { useState } from 'react';
import { InfoIcon } from '../assets/icons/Icons';

export default function SettingsAccountInfo() {
  const [requested, setRequested] = useState(false);
  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 overflow-y-auto">
      <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Request Account Info</h2>
      </div>
      <div className="p-6 max-w-lg">
        <div className="w-16 h-16 rounded-full bg-brand-500 grid place-items-center mb-4">
          <InfoIcon size={26} className="text-white" />
        </div>
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Request Report</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
          Create a report of your Wisp account information, settings, and how you use the app. This report does not include your messages.
        </p>
        <button
          onClick={() => setRequested(true)}
          disabled={requested}
          className="px-5 py-2 rounded-lg bg-brand-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium text-sm hover:bg-brand-600 transition-colors"
        >
          {requested ? 'Report requested ✓' : 'Request Report'}
        </button>
      </div>
    </div>
  );
}
