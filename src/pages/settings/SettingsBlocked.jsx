import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { contactById } from '../../data/mockData';
import SettingsSubHeader from '../../components/SettingsSubHeader';
import Avatar from '../../components/Avatar';
import NewChatModal from '../../components/NewChatModal';
import { PlusIcon } from '../../assets/icons/Icons';

export default function SettingsBlocked() {
  const navigate = useNavigate();
  const { blocked, toggleBlock } = useApp();
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full bg-white dark:bg-slate-900">
      <SettingsSubHeader title="Blocked Contacts" onBack={() => navigate('/settings/privacy')} />
      <div className="flex-1 overflow-y-auto px-4 py-3 max-w-lg">
        <button
          onClick={() => setPickerOpen(true)}
          className="w-full flex items-center gap-2.5 px-2 py-2.5 text-brand-600 dark:text-brand-400 font-medium text-[14px] hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-lg"
        >
          <PlusIcon size={16} />
          Block New Contact
        </button>

        <div className="mt-2 flex flex-col">
          {blocked.length === 0 && <p className="text-sm text-slate-400 py-6 text-center">No blocked contacts</p>}
          {blocked.map((id) => {
            const c = contactById(id);
            if (!c) return null;
            return (
              <div key={id} className="flex items-center gap-3 px-2 py-2.5">
                <Avatar src={c.avatar} name={c.name} size={40} />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-slate-800 dark:text-slate-100 truncate">{c.name}</p>
                  <p className="text-xs text-slate-400 truncate">{c.about}</p>
                </div>
                <button onClick={() => toggleBlock(id)} className="text-slate-400 hover:text-red-500 text-lg leading-none px-2" title="Unblock">
                  ×
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <NewChatModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title="Block New Contact"
        onPick={(id) => toggleBlock(id)}
        excludeIds={blocked}
      />
    </div>
  );
}
