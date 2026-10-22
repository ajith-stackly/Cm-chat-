import { useEffect, useState } from 'react';
import Modal from './Modal';

const options = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'system', label: 'System Default' },
];

export default function ThemeModal({ open, onClose, current, onApply }) {
  const [choice, setChoice] = useState(current);

  // Re-sync with the saved theme every time the modal opens
  // (otherwise a cancelled, unapplied choice stays selected next time)
  useEffect(() => {
    if (open) setChoice(current);
  }, [open, current]);

  return (
    <Modal open={open} onClose={onClose} title={null} maxWidth="max-w-sm">
      <div className="p-5">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Choose Theme</h3>
        <div className="flex flex-col gap-3 mb-5" role="radiogroup" aria-label="Theme">
          {options.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-3 cursor-pointer text-[14.5px] text-slate-700 dark:text-slate-200"
            >
              <input
                type="radio"
                name="theme"
                value={opt.id}
                checked={choice === opt.id}
                onChange={() => setChoice(opt.id)}
                className="w-4 h-4 accent-brand-500"
              />
              {opt.label}
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-[13.5px] font-medium text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onApply(choice);
              onClose();
            }}
            className="px-4 py-2 rounded-lg text-[13.5px] font-medium bg-brand-500 text-white hover:bg-brand-600"
          >
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
}
