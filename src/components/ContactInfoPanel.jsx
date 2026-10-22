import { useState } from 'react';
import Avatar from './Avatar';
import { CloseIcon, PhoneIcon, VideoIcon, ImageIcon, LinkIcon, FileIcon, StarIcon, BellOffIcon, TrashIcon, BlockIcon, ChevronRightIcon, UsersIcon } from '../assets/icons/Icons';
import { contactById } from '../data/mockData';

export default function ContactInfoPanel({ convo, onClose, muted, onMute, onDelete, onBlock, starredMessages, onCall }) {
  const [tab, setTab] = useState('media');
  const isGroup = convo.type === 'group';
  const contact = !isGroup ? contactById(convo.contactId) : null;

  const images = convo.messages.filter((m) => m.type === 'image');
  const files = convo.messages.filter((m) => m.type === 'file');
  const links = convo.messages.filter((m) => m.text?.includes('http'));

  return (
    <aside className="w-full sm:w-[340px] shrink-0 bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800 flex flex-col h-full animate-slideUp overflow-y-auto">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 flex-1">{isGroup ? 'Group info' : 'Contact Info'}</h3>
        <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
          <CloseIcon size={18} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-2 py-6 border-b border-slate-100 dark:border-slate-800">
        <Avatar src={isGroup ? convo.avatar : contact?.avatar} name={isGroup ? convo.name : contact?.name} size={88} online={contact?.online} />
        <p className="font-semibold text-lg text-slate-800 dark:text-slate-100">{isGroup ? convo.name : contact?.name}</p>
        {!isGroup && <p className="text-slate-400 text-sm">{contact?.online ? 'Online' : contact?.lastSeen ? `Last seen ${contact.lastSeen}` : ''}</p>}
        {isGroup && <p className="text-slate-400 text-sm">Group · {convo.members.length} members</p>}
        <div className="flex gap-6 mt-3">
          <button onClick={() => onCall?.('voice')} className="flex flex-col items-center gap-1 text-brand-600 dark:text-brand-400">
            <span className="w-11 h-11 rounded-full bg-brand-50 dark:bg-brand-500/10 grid place-items-center"><PhoneIcon size={18} /></span>
            <span className="text-[11px]">Audio</span>
          </button>
          <button onClick={() => onCall?.('video')} className="flex flex-col items-center gap-1 text-brand-600 dark:text-brand-400">
            <span className="w-11 h-11 rounded-full bg-brand-50 dark:bg-brand-500/10 grid place-items-center"><VideoIcon size={18} /></span>
            <span className="text-[11px]">Video</span>
          </button>
        </div>
      </div>

      {!isGroup && contact?.about && (
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">About</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">{contact.about}</p>
        </div>
      )}

      {isGroup && (
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 mb-2 flex items-center gap-1.5"><UsersIcon size={12} /> Members</p>
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {convo.members.map((id) => {
              const c = contactById(id);
              if (!c) return null;
              return (
                <div key={id} className="flex items-center gap-2.5">
                  <Avatar src={c.avatar} name={c.name} size={30} />
                  <span className="text-sm text-slate-700 dark:text-slate-200">{c.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="px-4 pt-3">
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 text-[12.5px] font-medium">
          {['media', 'links', 'docs'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-1.5 rounded-lg capitalize transition-colors ${
                tab === t ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-3">
        {tab === 'media' && (
          images.length ? (
            <div className="grid grid-cols-3 gap-1.5">
              {images.map((m) => (
                <img key={m.id} src={m.image} alt="" className="aspect-square object-cover rounded-lg" />
              ))}
            </div>
          ) : <EmptyTab icon={ImageIcon} label="No media shared yet" />
        )}
        {tab === 'links' && (
          links.length ? (
            <div className="flex flex-col gap-2">
              {links.map((m) => (
                <div key={m.id} className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <LinkIcon size={16} className="text-brand-500 shrink-0" />
                  <span className="text-xs text-slate-600 dark:text-slate-300 truncate">{m.text}</span>
                </div>
              ))}
            </div>
          ) : <EmptyTab icon={LinkIcon} label="No links shared yet" />
        )}
        {tab === 'docs' && (
          files.length ? (
            <div className="flex flex-col gap-2">
              {files.map((m) => (
                <div key={m.id} className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <FileIcon size={16} className="text-brand-500 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate text-slate-700 dark:text-slate-200">{m.fileName}</p>
                    <p className="text-[10px] text-slate-400">{m.fileSize}</p>
                  </div>
                  <StarIcon size={13} className="text-amber-400 shrink-0" />
                </div>
              ))}
            </div>
          ) : <EmptyTab icon={FileIcon} label="No documents shared yet" />
        )}
      </div>

      {starredMessages?.length > 0 && (
        <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 mb-2">Starred messages</p>
          <p className="text-sm text-brand-600 dark:text-brand-400">{starredMessages.length} starred</p>
        </div>
      )}

      <div className="mt-auto border-t border-slate-100 dark:border-slate-800 py-1">
        <ActionRow icon={BellOffIcon} label={muted ? 'Unmute notifications' : 'Mute notifications'} onClick={onMute} />
        {!isGroup && <ActionRow icon={BlockIcon} label="Block contact" danger onClick={onBlock} />}
        <ActionRow icon={TrashIcon} label="Delete chat" danger onClick={onDelete} />
      </div>
    </aside>
  );
}

function EmptyTab({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8 text-slate-300 dark:text-slate-600">
      <Icon size={30} />
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}

function ActionRow({ icon: Icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13.5px] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
        danger ? 'text-red-500' : 'text-slate-600 dark:text-slate-200'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}
