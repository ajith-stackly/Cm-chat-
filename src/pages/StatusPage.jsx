import { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { contactById } from '../data/mockData';
import Avatar from '../components/Avatar';
import EmptyState from '../components/EmptyState';
import StatusComposer from '../components/StatusComposer';
import { BackIcon, PlusIcon } from '../assets/icons/Icons';

export default function StatusPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { statusUpdates, profile, addStatus, editStatus, deleteStatus, markStatusViewed } = useApp();
  const [composerStatus, setComposerStatus] = useState(null);
  const mine = statusUpdates.filter((status) => status.isMine);
  const notSeen = statusUpdates.filter((status) => !status.isMine && !status.viewed);
  const seen = statusUpdates.filter((status) => !status.isMine && status.viewed);
  const editorOpen = composerStatus !== null;

  const openStatus = (statusId) => {
    markStatusViewed(statusId);
    navigate(`/status/${statusId}`);
  };

  const publishStatus = (images, caption) => {
    if (composerStatus) editStatus(composerStatus.id, images, caption);
    else addStatus(images, caption);
    setComposerStatus(null);
    navigate('/status');
  };

  return (
    <div className="flex h-full min-w-0 flex-1">
      <div className={`w-full shrink-0 flex-col border-r border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 md:flex md:w-[360px] ${id || editorOpen ? 'hidden' : 'flex'}`}>
        <div className="flex items-center justify-between px-4 pb-3 pt-4">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/chats')}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Back to chats"
            >
              <BackIcon size={20} />
            </button>
            <h1 className="truncate text-xl font-bold text-slate-800 dark:text-slate-100">Updates</h1>
          </div>
          <button
            type="button"
            onClick={() => setComposerStatus(false)}
            className="grid h-9 w-9 place-items-center rounded-full text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-slate-800"
            aria-label="Add status"
            title="Add status"
          >
            <PlusIcon size={21} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {mine.length > 0 && (
            <StatusSection title="Not seen">
              {mine.map((status) => (
                <StatusRow
                  key={status.id}
                  status={status}
                  profile={profile}
                  active={id === status.id}
                  onClick={() => openStatus(status.id)}
                  onEdit={() => setComposerStatus(status)}
                  isMine
                />
              ))}
              {notSeen.map((status) => (
                <StatusRow
                  key={status.id}
                  status={status}
                  active={id === status.id}
                  onClick={() => openStatus(status.id)}
                />
              ))}
            </StatusSection>
          )}
          {mine.length === 0 && notSeen.length > 0 && (
            <StatusSection title="Not seen">
              {notSeen.map((status) => (
                <StatusRow key={status.id} status={status} active={id === status.id} onClick={() => openStatus(status.id)} />
              ))}
            </StatusSection>
          )}
          {seen.length > 0 && (
            <StatusSection title="Seen">
              {seen.map((status) => (
                <StatusRow key={status.id} status={status} active={id === status.id} onClick={() => openStatus(status.id)} seen />
              ))}
            </StatusSection>
          )}
          {statusUpdates.length === 0 && (
            <button
              type="button"
              onClick={() => setComposerStatus(false)}
              className="mx-2 mt-3 w-[calc(100%-1rem)] rounded-xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500 hover:border-brand-400 hover:text-brand-600 dark:border-slate-700"
            >
              No updates yet. Add your first status.
            </button>
          )}
        </div>
      </div>

      <div className={`min-w-0 flex-1 ${id || editorOpen ? 'flex' : 'hidden md:flex'}`}>
        {editorOpen ? (
          <StatusComposer
            profile={profile}
            status={composerStatus || null}
            onClose={() => setComposerStatus(null)}
            onPublish={publishStatus}
          />
        ) : id ? (
          <Outlet context={{ statusUpdates, deleteStatus }} />
        ) : (
          <EmptyState hint="Click on an update to view" />
        )}
      </div>
    </div>
  );
}

function StatusSection({ title, children }) {
  return (
    <section className="mb-2">
      <h2 className="px-2.5 pb-2 pt-3 text-[13px] font-semibold text-slate-500 dark:text-slate-400">{title}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}

function StatusRow({ status, profile, active, onClick, onEdit, isMine = false, seen = false }) {
  const contact = isMine ? profile : contactById(status.contactId);
  if (!contact) return null;

  return (
    <div className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${active ? 'bg-brand-500' : 'bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/70'}`}>
      <button type="button" onClick={onClick} className="shrink-0" aria-label={`View ${contact.name}'s update`}>
        <div className={`shrink-0 rounded-full p-[2px] ${seen ? 'bg-slate-300 dark:bg-slate-600' : 'bg-gradient-to-tr from-brand-400 to-emerald-400'}`}>
          <Avatar src={contact.avatar} name={contact.name} size={48} className="ring-2 ring-white dark:ring-slate-900" />
        </div>
      </button>
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={onClick}
          className={`block max-w-full truncate text-left text-[14px] font-semibold ${active ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}
        >
          {isMine ? `${contact.name} (Me)` : contact.name}
        </button>
        {isMine ? (
          <button
            type="button"
            onClick={onEdit}
            className={`block text-left text-xs ${active ? 'text-white/85 hover:text-white' : 'text-brand-600 hover:underline dark:text-brand-400'}`}
            aria-label="Edit your status"
          >
            Edit
          </button>
        ) : null}
      </div>
      <span className={`shrink-0 text-xs ${active ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
        {status.slides[0]?.time || ''}
      </span>
    </div>
  );
}
