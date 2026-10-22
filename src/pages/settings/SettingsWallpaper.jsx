import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { wallpaperSwatches } from '../../data/mockData';
import SettingsSubHeader from '../../components/SettingsSubHeader';
import { CheckIcon } from '../../assets/icons/Icons';
import { themedWallpaper } from '../../utils';

export default function SettingsWallpaper() {
  const { wallpaper, setWallpaper, resolvedTheme } = useApp();
  const [preview, setPreview] = useState(wallpaper);
  const [doodle, setDoodle] = useState(true);
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();

  const apply = () => {
    setWallpaper(preview);
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      navigate(-1);
    }, 700);
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 min-w-0 h-full bg-white dark:bg-slate-900">
      <div className="flex flex-col w-full md:w-[360px] shrink-0 border-r border-slate-100 dark:border-slate-800">
        <SettingsSubHeader title="Set Chat Wallpaper" />
        <div className="px-5 py-4 overflow-y-auto">
          <label className="flex items-center justify-between mb-4 text-[13.5px] text-slate-600 dark:text-slate-300">
            Enable Talk Doodle
            <input type="checkbox" checked={doodle} onChange={() => setDoodle((v) => !v)} className="w-4 h-4 accent-brand-500" />
          </label>
          <div className="grid grid-cols-3 gap-3">
            {wallpaperSwatches.map((c) => (
              <button
                key={c}
                onClick={() => setPreview(c)}
                className="aspect-square rounded-xl relative ring-1 ring-black/5"
                style={{ backgroundColor: c }}
              >
                {preview === c && (
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="w-6 h-6 rounded-full bg-white/90 grid place-items-center">
                      <CheckIcon size={14} className="text-brand-600" />
                    </span>
                  </span>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={apply}
            className="w-full mt-6 py-2.5 rounded-lg bg-brand-500 text-white font-medium text-sm hover:bg-brand-600 transition-colors"
          >
            {applied ? 'Applied ✓' : 'Apply Wallpaper'}
          </button>
        </div>
      </div>
      <div className="flex-1 hidden md:flex flex-col">
        <div className="px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 text-sm font-medium text-slate-500">Wallpaper Preview</div>
        <div className="flex-1" style={{ backgroundColor: themedWallpaper(preview, resolvedTheme === 'dark') }} />
      </div>
    </div>
  );
}
