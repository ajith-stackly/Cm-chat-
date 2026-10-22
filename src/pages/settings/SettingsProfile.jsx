import { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import SettingsSubHeader from '../../components/SettingsSubHeader';
import Avatar from '../../components/Avatar';
import { CameraIcon } from '../../assets/icons/Icons';

const MAX_PHOTO_SIZE = 10 * 1024 * 1024;
const MAX_AVATAR_DIMENSION = 512;

export default function SettingsProfile() {
  const { profile, setProfile } = useApp();
  const [name, setName] = useState(profile.name);
  const [about, setAbout] = useState(profile.about);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [saved, setSaved] = useState(false);
  const [photoError, setPhotoError] = useState('');
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

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = '';
    setPhotoError('');

    if (!file.type.startsWith('image/')) {
      setPhotoError('Choose an image file.');
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      setPhotoError('Choose an image smaller than 10 MB.');
      return;
    }

    try {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, MAX_AVATAR_DIMENSION / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      const context = canvas.getContext('2d');
      if (!context) {
        bitmap.close();
        setPhotoError('Could not process this image. Please try another one.');
        return;
      }
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      setAvatar(canvas.toDataURL('image/jpeg', 0.85));
    } catch {
      setPhotoError('Could not open this image. Please try another one.');
    }
  };

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full bg-white dark:bg-slate-900">
      <SettingsSubHeader title="Profile" />
      <div className="flex-1 overflow-y-auto px-6 py-6 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Avatar src={avatar} name={name} size={110} />
            <button
              type="button"
              onClick={handlePhotoClick}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-500 text-white grid place-items-center shadow-md hover:bg-brand-600"
              title="Change photo"
              aria-label="Change profile photo"
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
        {photoError && <p role="alert" className="mb-4 text-center text-xs text-red-500">{photoError}</p>}

        <label className="text-xs font-medium text-brand-500 block mb-1">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-b-2 border-brand-500 bg-transparent pb-2 outline-none text-[15px] text-slate-800 dark:text-slate-100 mb-1"
        />
        <p className="text-xs text-slate-400 mb-5">This name is visible to your contacts</p>

        <label className="text-xs font-medium text-slate-400 block mb-1">About</label>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={3}
          className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none text-[14px] text-slate-700 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 focus:border-brand-500 mb-2 resize-none"
        />
        <p className="text-xs text-slate-400 mb-5">Phone: {profile.phone}</p>

        <button
          type="button"
          onClick={save}
          disabled={!dirty}
          className="px-6 py-2 rounded-lg border border-brand-500 text-brand-600 dark:text-brand-400 font-medium text-sm hover:bg-brand-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {saved ? 'Saved ✓' : 'Save'}
        </button>
      </div>
    </div>
  );
}
