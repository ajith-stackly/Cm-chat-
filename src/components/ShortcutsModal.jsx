import Modal from './Modal';
import { keyboardShortcuts } from '../data/mockData';

export default function ShortcutsModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Keyboard Shortcuts" maxWidth="max-w-4xl">
      <div className="px-6 py-5 grid sm:grid-cols-2 gap-x-12 gap-y-3">
        {keyboardShortcuts.map((s) => (
          <div key={s.action} className="flex items-center justify-between gap-4 text-[14px] text-slate-700 dark:text-slate-200">
            <span className="min-w-0">{s.action}</span>
            <div className="flex items-center gap-1.5 shrink-0">
              {s.keys.map((k, i) => (
                <kbd
                  key={i}
                  className="min-w-[26px] h-8 px-2 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-[11px] font-medium text-slate-600 dark:text-slate-300 shadow-[inset_0_-1px_0_rgba(15,23,42,0.08)] flex items-center justify-center"
                >
                  {k}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end px-6 pb-5 pt-2">
        <button
          onClick={onClose}
          className="px-8 py-2.5 rounded-xl text-[15px] font-semibold bg-brand-500 text-white hover:bg-brand-600 shadow-sm"
        >
          OK
        </button>
      </div>
    </Modal>
  );
}
