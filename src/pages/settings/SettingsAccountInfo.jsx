import SettingsSubHeader from '../../components/SettingsSubHeader';
import { ClipboardIcon } from '../../assets/icons/Icons';

export default function SettingsAccountInfo() {
  return (
    <div className="flex flex-col flex-1 min-w-0 h-full bg-white dark:bg-slate-900">
      <SettingsSubHeader title="Request Account Info" />
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-full bg-[#5B96F7]">
          <ClipboardIcon size={32} className="text-white" />
        </div>
        <h3 className="border-b border-slate-200 pb-2 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200">
          Request Report
        </h3>
        <p className="pt-3 text-[11px] leading-[1.4] text-slate-500 dark:text-slate-400">
          Create a report of your Talk Account information and settings, which you can import or transfer to another app. This report does not include your messages.
        </p>
      </div>
    </div>
  );
}
