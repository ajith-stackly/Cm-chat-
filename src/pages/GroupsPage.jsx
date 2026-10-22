import { useMemo, useState, useRef } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { previewText, lastTime } from '../utils';
import ListItem from '../components/ListItem';
import EmptyState from '../components/EmptyState';
import NewChatModal from '../components/NewChatModal';
import Modal from '../components/Modal';
import Avatar from '../components/Avatar';
import { SearchIcon, PlusIcon, CameraIcon } from '../assets/icons/Icons';

export default function GroupsPage() {
  const { groups, mutedChats, createGroup } = useApp();
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupAvatar, setGroupAvatar] = useState('');
  const fileInputRef = useRef(null);

  const visible = groups.filter((g) => !g.archived);
  const filtered = useMemo(
    () => visible.filter((g) => g.name.toLowerCase().includes(search.toLowerCase())),
    [visible, search]
  );
  const pinned = filtered.filter((g) => g.pinned);
  const rest = filtered.filter((g) => !g.pinned);

  const finalizeCreate = () => {
    if (!groupName.trim() || pendingMembers.length === 0) return;
    const newId = createGroup(groupName.trim(), pendingMembers, groupAvatar || undefined);
    setNameModalOpen(false);
    setGroupName('');
    setGroupAvatar('');
    setPendingMembers([]);
    navigate(`/groups/${newId}`);
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setGroupAvatar(reader.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="flex flex-1 min-w-0 h-full">
      <div className={`w-full md:w-[360px] shrink-0 flex flex-col border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 ${id ? 'hidden md:flex' : 'flex'}`}>
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Groups</h1>
          <button onClick={() => setPickerOpen(true)} title="Create new group" className="w-9 h-9 grid place-items-center rounded-full text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-800 dark:text-brand-400">
            <PlusIcon size={19} />
          </button>
        </div>
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2">
            <SearchIcon size={16} className="text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="bg-transparent outline-none flex-1 text-[13.5px] text-slate-700 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>
        <button
          onClick={() => setPickerOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-brand-600 dark:text-brand-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left"
        >
          <PlusIcon size={16} />
          Create New Group
        </button>

        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {pinned.length > 0 && (
            <>
              <p className="px-2.5 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Pinned</p>
              {pinned.map((g) => <GroupRow key={g.id} g={g} active={id === g.id} muted={mutedChats.includes(g.id)} onClick={() => navigate(`/groups/${g.id}`)} />)}
            </>
          )}
          {rest.length > 0 && (
            <>
              <p className="px-2.5 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{pinned.length ? 'All Chats' : ''}</p>
              {rest.map((g) => <GroupRow key={g.id} g={g} active={id === g.id} muted={mutedChats.includes(g.id)} onClick={() => navigate(`/groups/${g.id}`)} />)}
            </>
          )}
          {filtered.length === 0 && <p className="text-center text-sm text-slate-400 py-10 px-6">No groups yet. Create one!</p>}
        </div>
      </div>

      <div className={`flex-1 min-w-0 ${id ? 'flex' : 'hidden md:flex'}`}>
        {id ? <Outlet /> : <EmptyState onLinkClick={() => setPickerOpen(true)} linkText="new group" />}
      </div>

      <NewChatModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title="Create New Group"
        multi
        onConfirmMulti={(ids) => { setPendingMembers(ids); setPickerOpen(false); setNameModalOpen(true); }}
      />

      <Modal open={nameModalOpen} onClose={() => setNameModalOpen(false)} title="Create New Group" maxWidth="max-w-sm">
        <div className="p-5">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Avatar src={groupAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(groupName || 'group')}`} name={groupName || 'Group'} size={64} />
              <button
                type="button"
                onClick={handleAvatarClick}
                className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-white shadow-md hover:bg-brand-600"
                title="Choose group image"
              >
                <CameraIcon size={14} />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>
          </div>

          <label className="text-xs text-slate-400 mb-1 block">Group Name</label>
          <input
            autoFocus
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="e.g. Weekend Trip"
            className="w-full border border-slate-200 dark:border-slate-600 bg-transparent rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-500 text-slate-700 dark:text-slate-100 mb-4"
          />
          <p className="text-xs text-slate-400 mb-4">{pendingMembers.length} member{pendingMembers.length !== 1 && 's'} selected</p>
          <button
            onClick={finalizeCreate}
            disabled={!groupName.trim()}
            className="w-full py-2.5 rounded-lg bg-brand-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium text-sm hover:bg-brand-600 transition-colors"
          >
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
}

function GroupRow({ g, active, muted, onClick }) {
  return (
    <ListItem
      avatar={g.avatar}
      name={g.name}
      lastMessage={previewText(g)}
      lastTime={lastTime(g)}
      unread={g.unread}
      pinned={g.pinned}
      muted={muted}
      active={active}
      onClick={onClick}
    />
  );
}
