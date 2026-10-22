import { useNavigate } from 'react-router-dom';
import { BackIcon } from '../assets/icons/Icons';

export default function SettingsSubHeader({ title, onBack }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
      <button onClick={onBack || (() => navigate(-1))} className="text-slate-500 dark:text-slate-300">
        <BackIcon size={20} />
      </button>
      <h2 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
    </div>
  );
}
