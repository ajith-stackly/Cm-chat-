import settingsIllustration from '../assets/images/settings-illustration.png';

export default function EmptyState({ title = 'Select a conversation', linkText, onLinkClick, hint }) {
  return (
    <div className="hidden md:flex flex-1 flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-900 h-full text-center px-6">
      <img
        src={settingsIllustration}
        alt="Settings illustration"
        className="animate-fadeIn mix-blend-multiply dark:mix-blend-screen dark:invert dark:hue-rotate-180 dark:opacity-80"
        style={{ width: 287, height: 287, opacity: 1, transform: 'rotate(0deg)' }}
      />
      <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xs">
        {hint || (
          <>
            {title} or start a{' '}
            <button onClick={onLinkClick} className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
              {linkText || 'new one'}
            </button>
          </>
        )}
      </p>
    </div>
  );
}
