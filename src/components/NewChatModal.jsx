import { useState } from 'react';
import Modal from './Modal';
import Avatar from './Avatar';
import { SearchIcon } from '../assets/icons/Icons';
import { contacts } from '../data/mockData';

export default function NewChatModal({ open, onClose, onPick, title = 'New chat', multi = false, onConfirmMulti, excludeIds = [] }) {
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState([]);

  const filtered = contacts
    .filter((c) => !excludeIds.includes(c.id))
    .filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  const toggle = (id) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const close = () => { setQ(''); setSelected([]); onClose(); };

  return (
    <Modal open={open} onClose={close} title={title} maxWidth="max-w-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-xl px-3 py-2 mb-3">
          <SearchIcon size={16} className="text-slate-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="bg-transparent outline-none flex-1 text-[13.5px] text-slate-700 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>
        <div className="flex flex-col gap-1 max-h-72 overflow-y-auto">
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => (multi ? toggle(c.id) : (onPick(c.id), close()))}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
            >
              <Avatar src={c.avatar} name={c.name} size={38} online={c.online} />
              <div className="flex-1 text-left min-w-0">
                <p className="text-[14px] font-medium text-slate-800 dark:text-slate-100 truncate">{c.name}</p>
                <p className="text-[12px] text-slate-400 truncate">{c.about}</p>
              </div>
              {multi && (
                <input type="checkbox" readOnly checked={selected.includes(c.id)} className="w-4 h-4 accent-brand-500" />
              )}
            </button>
          ))}
          {filtered.length === 0 && <p className="text-center text-sm text-slate-400 py-6">No contacts found</p>}
        </div>
        {multi && (
          <button
            disabled={selected.length === 0}
            onClick={() => { onConfirmMulti(selected); close(); }}
            className="w-full mt-3 py-2.5 rounded-lg bg-brand-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium text-sm hover:bg-brand-600 transition-colors"
          >
            Continue {selected.length > 0 && `(${selected.length})`}
          </button>
        )}
      </div>
    </Modal>
  );
}
