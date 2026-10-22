import { NavLink, useNavigate } from 'react-router-dom';
import { ChatIcon, UsersIcon, PhoneIcon, GearIcon, SunIcon, MoonIcon, ImageIcon } from '../assets/icons/Icons';
import Avatar from './Avatar';
import { useApp } from '../context/AppContext';
import logo from '../assets/images/logo.png';
import railAvatar from '../assets/images/rail-avatar.jpg';

const items = [
  { to: '/chats', icon: ChatIcon, label: 'Chats' },
  { to: '/status', icon: ImageIcon, label: 'Updates' },
  { to: '/groups', icon: UsersIcon, label: 'Groups' },
  { to: '/calls', icon: PhoneIcon, label: 'Calls' },
  { to: '/settings', icon: GearIcon, label: 'Settings' },
];

export default function Sidebar() {
  const { resolvedTheme, setTheme, profile } = useApp();
  const navigate = useNavigate();
  const isDark = resolvedTheme === 'dark';

  return (
    <>
      {/* Desktop vertical rail */}
      <nav className="hidden md:flex w-[76px] shrink-0 flex-col items-center py-5 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 shadow-rail z-20">
        <div className="w-12 h-12 grid place-items-center mb-6 shrink-0 rounded-2xl bg-blue-100 dark:bg-brand-500/15 shadow-sm ring-1 ring-blue-200/70 dark:ring-brand-400/20">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {items.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              title={label}
              className={({ isActive }) =>
                `w-11 h-11 rounded-xl grid place-items-center transition-colors ${
                  isActive
                    ? 'bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400'
                    : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon size={21} />
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="w-11 h-6 rounded-full bg-brand-500 relative mb-5 transition-colors shrink-0"
          title="Toggle theme"
          aria-label="Toggle theme"
        >
          <span
            className={`absolute top-0.5 grid place-items-center w-5 h-5 rounded-full bg-white shadow transition-transform ${
              isDark ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          >
            {isDark ? <MoonIcon size={12} className="text-brand-600" /> : <SunIcon size={12} className="text-brand-500" />}
          </span>
        </button>

        <button onClick={() => navigate('/settings/profile')} title="Profile" className="shrink-0">
          <Avatar src={railAvatar} name={profile.name} size={36} />
        </button>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 flex items-stretch bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pb-[env(safe-area-inset-bottom)]">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${
                isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
        <button
          onClick={() => navigate('/settings/profile')}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-medium text-slate-400"
        >
          <Avatar src={profile.avatar} name={profile.name} size={20} />
          Profile
        </button>
      </nav>
    </>
  );
}
