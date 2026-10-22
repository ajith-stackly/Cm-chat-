import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { contacts, contactById } from '../data/mockData';
import Avatar from '../components/Avatar';
import Modal from '../components/Modal';
import { PlusIcon, CloseIcon, SearchIcon } from '../assets/icons/Icons';

export default function SettingsBlocked() {
  const { blocked, toggleBlock } = useApp();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const available = contacts.filter((c) => !blocked.includes(c.id) && c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 overflow-y-auto">
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Blocked Contacts</h2>
        <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 text-sm font-medium">
          <PlusIcon size={16} /> Block New Contact
        </button>
      </div>
      <div className="p-3 max-w-lg">
        {blocked.length === 0 && <p className="text-center text-sm text-slate-400 py-10">No blocked contacts</p>}
        {blocked.map((id) => {
          const c = contactById(id);
          if (!c) return null;
          return (
            <div key={id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60">
              <Avatar src={c.avatar} name={c.name} size={42} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{c.name}</p>
                <p className="text-xs text-slate-400 truncate">{c.about}</p>
              </div>
              <button onClick={() => toggleBlock(id)} className="w-8 h-8 grid place-items-center rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                <CloseIcon size={16} />
              </button>
            </div>
          );
        })}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Block New Contact" maxWidth="max-w-sm">
        <div className="p-4">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-xl px-3 py-2 mb-3">
            <SearchIcon size={16} className="text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="bg-transparent outline-none flex-1 text-[13.5px] text-slate-700 dark:text-slate-100 placeholder:text-slate-400" />
          </div>
          <div className="flex flex-col gap-1 max-h-72 overflow-y-auto">
            {available.map((c) => (
              <button key={c.id} onClick={() => { toggleBlock(c.id); setOpen(false); }} className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/60">
                <Avatar src={c.avatar} name={c.name} size={38} />
                <div className="flex-1 text-left min-w-0">
                  <p className="text-[14px] font-medium text-slate-800 dark:text-slate-100 truncate">{c.name}</p>
                  <p className="text-[12px] text-slate-400 truncate">{c.about}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
