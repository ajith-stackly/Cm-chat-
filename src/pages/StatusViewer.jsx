
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { contactById, contacts } from '../data/mockData';
import { CloseIcon, SendIcon, TrashIcon } from '../assets/icons/Icons';

export default function StatusViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { statusUpdates, deleteStatus } = useOutletContext();
  const { profile } = useApp();
  const [viewer, setViewer] = useState({ id, slideIdx: 0 });
  const [reply, setReply] = useState('');
  const [progressState, setProgressState] = useState({ key: '', value: 0 });

  const status = statusUpdates.find((s) => s.id === id);
  const slideIdx = viewer.id === id ? viewer.slideIdx : 0;
  const progressKey = `${id}:${slideIdx}`;
  const progress = progressState.key === progressKey ? progressState.value : 0;

  useEffect(() => {
    if (!status) return;
    const iv = setInterval(() => {
      setProgressState((current) => {
        if (current.key === progressKey && current.value >= 100) return current;
        return {
          key: progressKey,
          value: Math.min(100, (current.key === progressKey ? current.value : 0) + 100 / 60),
        };
      });
    }, 100);
    return () => clearInterval(iv);
  }, [progressKey, status]);

  if (!status) return <div className="flex-1 grid place-items-center text-slate-400">Status not found</div>;

  const contact = status.isMine ? profile : contactById(status.contactId);
  const totalSlides = status.slides.length;
  const slide = status.slides[slideIdx];

  const goNext = () => {
    if (slideIdx < totalSlides - 1) setViewer({ id, slideIdx: slideIdx + 1 });
    else navigate('/status');
  };
  const goPrev = () => { if (slideIdx > 0) setViewer({ id, slideIdx: slideIdx - 1 }); };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-slate-50 dark:bg-slate-900">
      <header className="flex h-[68px] shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
          {status.isMine ? `${contact.name} (Me)` : contact.name}
          <span className="ml-2 text-xs font-normal text-slate-400">{slide.time}</span>
        </p>
        {status.isMine && (
          <button
            onClick={() => { deleteStatus(status.id); navigate('/status'); }}
            className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
            title="Delete status"
            aria-label="Delete status"
          >
            <TrashIcon size={18} />
          </button>
        )}
        <button
          onClick={() => navigate('/status')}
          className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Close status"
        >
          <CloseIcon size={20} />
        </button>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center gap-4 px-3 py-3 md:px-8">
        <button
          type="button"
          onClick={goPrev}
          disabled={slideIdx === 0}
          className="z-10 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-sm hover:bg-white disabled:opacity-30 md:flex"
          aria-label="Previous update"
        >
          <span className="text-3xl leading-none">‹</span>
        </button>

        <div className="relative flex h-full min-h-0 max-h-[min(760px,calc(100dvh-140px))] w-auto max-w-full aspect-[9/16] flex-col overflow-hidden rounded-xl bg-black shadow-md">
          <div className="absolute left-3 right-3 top-3 z-20 flex gap-1">
            {status.slides.map((_, index) => (
              <div key={index} className="h-1 flex-1 overflow-hidden rounded-full bg-white/40">
                <div
                  className="h-full bg-white transition-[width] duration-100 linear"
                  style={{ width: `${index < slideIdx ? 100 : index === slideIdx ? progress : 0}%` }}
                />
              </div>
            ))}
          </div>

          <img src={slide.image} alt="Status update" className="h-full w-full object-cover" />
          {slide.caption && (
            <p className="absolute bottom-16 left-4 right-4 z-10 rounded-lg bg-black/35 px-3 py-2 text-center text-sm text-white">
              {slide.caption}
            </p>
          )}

          <button className="absolute left-0 top-0 z-10 h-full w-1/3" onClick={goPrev} aria-label="Previous" />
          <button className="absolute right-0 top-0 z-10 h-full w-1/3" onClick={goNext} aria-label="Next" />

          {status.isMine ? (
            <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center">
              <span className="rounded-full bg-black/35 px-3 py-1 text-xs text-white/90">
                {contacts.slice(0, 3).length} viewed
              </span>
            </div>
          ) : (
            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center gap-2">
              <input
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                placeholder={`Reply to ${contact.name}`}
                className="min-w-0 flex-1 rounded-full border border-white/30 bg-black/25 px-4 py-2 text-sm text-white outline-none backdrop-blur-sm placeholder:text-white/70"
              />
              <button
                onClick={() => setReply('')}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-500 text-white"
                aria-label="Send reply"
              >
                <SendIcon size={16} />
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="z-10 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-sm hover:bg-white md:flex"
          aria-label="Next update"
        >
          <span className="text-3xl leading-none">›</span>
        </button>
      </div>
    </div>
  );
}
