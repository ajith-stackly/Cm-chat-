import { useApp } from '../context/AppContext';
import { wallpaperSwatches } from '../data/mockData';
import { CheckIcon } from '../assets/icons/Icons';

export default function SettingsWallpaper() {
  const { wallpaper, setWallpaper } = useApp();

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full bg-white dark:bg-slate-900 overflow-hidden">
      <div className="w-full md:w-[300px] shrink-0 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 overflow-y-auto">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Set Chat Wallpaper</h2>
        </div>
        <div className="px-6 pb-4 flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-300">Enable Talk Doodle</span>
          <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand-500" />
        </div>
        <div className="grid grid-cols-4 gap-2.5 px-6 pb-6">
          {wallpaperSwatches.map((color) => (
            <button
              key={color}
              onClick={() => setWallpaper(color)}
              className="aspect-square rounded-lg relative"
              style={{ backgroundColor: color }}
              title={color}
            >
              {wallpaper === color && (
                <span className="absolute inset-0 grid place-items-center">
                  <CheckIcon size={16} className={parseInt(color.slice(1), 16) > 0x999999 ? 'text-slate-800' : 'text-white'} />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col min-h-[240px]">
        <p className="text-xs uppercase tracking-wide text-slate-400 px-4 pt-4">Wallpaper Preview</p>
        <div className="flex-1 m-4 rounded-xl" style={{ backgroundColor: wallpaper }} />
      </div>
    </div>
  );
}
