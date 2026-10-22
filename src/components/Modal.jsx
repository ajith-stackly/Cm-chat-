import { useEffect } from 'react';
import { CloseIcon } from '../assets/icons/Icons';

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-md' }) {
  // Close on Escape
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/60 backdrop-blur-[1px] px-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`w-full ${maxWidth} bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-[18px] shadow-[0_24px_60px_rgba(15,23,42,0.18)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.6)] overflow-hidden animate-popIn max-h-[85vh] flex flex-col border border-slate-200 dark:border-slate-700`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-[19px] md:text-[22px] font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full grid place-items-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <CloseIcon size={18} />
            </button>
          </div>
        )}
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
