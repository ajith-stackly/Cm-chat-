import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import Avatar from '../components/Avatar';
import { CameraIcon } from '../assets/icons/Icons';

export default function SettingsProfile() {
  const { profile, setProfile } = useApp();
  const [name, setName] = useState(profile.name);
  const [about, setAbout] = useState(profile.about);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  const dirty = name !== profile.name || about !== profile.about || avatar !== profile.avatar;

  const save = () => {
    const nextProfile = {
      ...profile,
      name: name.trim() || profile.name,
      about: about.trim() || profile.about,
      avatar,
    };

    setProfile(nextProfile);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const hasCustomAvatar = Boolean(profile.avatar) && profile.avatar !== 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shreyansh%20shah';
    if (hasCustomAvatar) {
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 overflow-y-auto">
      <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Profile</h2>
      </div>
      <div className="p-6 max-w-md">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="relative">
            <Avatar src={avatar} name={name} size={96} />
            <button
              type="button"
              onClick={handlePhotoClick}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-500 text-white grid place-items-center shadow-lg"
              title="Change photo"
            >
              <CameraIcon size={15} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>
        </div>

        <label className="text-xs text-brand-500 font-medium block mb-1">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-brand-300 focus:border-brand-500 bg-transparent rounded-lg px-3 py-2.5 text-sm outline-none text-slate-700 dark:text-slate-100 mb-1.5"
        />
        <p className="text-[11px] text-slate-400 mb-5">This name is visible to your contacts</p>

        <label className="text-xs text-slate-400 font-medium block mb-1">About</label>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={3}
          className="w-full border border-slate-200 dark:border-slate-600 focus:border-brand-500 bg-transparent rounded-lg px-3 py-2.5 text-sm outline-none text-slate-700 dark:text-slate-100 mb-1.5 resize-none"
        />
        <p className="text-[11px] text-slate-400 mb-5">{profile.phone}</p>

        <button
          type="button"
          onClick={save}
          disabled={!dirty}
          className="px-5 py-2 rounded-lg border border-brand-400 text-brand-600 dark:text-brand-400 font-medium text-sm hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saved ? 'Saved ✓' : 'Save'}
        </button>
      </div>
    </div>
  );
}
