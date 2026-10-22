import { useRef, useState } from 'react';
import Avatar from './Avatar';
import { CloseIcon, PlusIcon, SendIcon, TrashIcon } from '../assets/icons/Icons';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 1280;
const MAX_STATUS_IMAGES = 10;

async function prepareImage(file) {
  if (!file.type.startsWith('image/')) {
    throw new Error(`${file.name} is not an image.`);
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error(`${file.name} is larger than 10 MB.`);
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext('2d');
  if (!context) {
    bitmap.close();
    throw new Error(`Could not process ${file.name}.`);
  }
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL('image/jpeg', 0.82);
}

export default function StatusComposer({ profile, status, onClose, onPublish }) {
  const initialSlides = status?.slides.map((slide) => slide.image) || [];
  const [images, setImages] = useState(initialSlides);
  const [activeIndex, setActiveIndex] = useState(0);
  const [caption, setCaption] = useState(status?.slides[0]?.caption || '');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);
  const isEditing = Boolean(status);

  const addImages = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (files.length === 0) return;

    const available = MAX_STATUS_IMAGES - images.length;
    if (available <= 0) {
      setError(`You can add up to ${MAX_STATUS_IMAGES} photos to a status.`);
      return;
    }

    setBusy(true);
    setError('');
    try {
      const prepared = [];
      for (const file of files.slice(0, available)) {
        prepared.push(await prepareImage(file));
      }
      setImages((current) => [...current, ...prepared]);
      if (images.length === 0 && prepared.length > 0) setActiveIndex(0);
      if (files.length > available) {
        setError(`Only ${MAX_STATUS_IMAGES} photos can be added to a status.`);
      }
    } catch (imageError) {
      setError(imageError instanceof Error ? imageError.message : 'Could not load the selected images.');
    } finally {
      setBusy(false);
    }
  };

  const removeImage = (index) => {
    setImages((current) => current.filter((_, imageIndex) => imageIndex !== index));
    setActiveIndex((current) => Math.max(0, Math.min(current, images.length - 2)));
  };

  const publish = () => {
    if (images.length === 0 || busy) return;
    onPublish(images, caption.trim());
  };

  return (
    <section className="relative flex min-w-0 flex-1 flex-col bg-slate-50 dark:bg-slate-950">
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-5 py-3 dark:border-slate-800 dark:bg-slate-900">
        <Avatar src={profile.avatar} name={profile.name} size={36} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
            {isEditing ? 'Edit your update' : 'Add to your update'}
          </p>
          <p className="text-xs text-slate-400">{images.length} of {MAX_STATUS_IMAGES} photos</p>
        </div>
        {isEditing && (
          <button
            type="button"
            onClick={() => setImages([])}
            className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
            title="Remove all photos"
            aria-label="Remove all photos"
          >
            <TrashIcon size={18} />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Close status editor"
        >
          <CloseIcon size={20} />
        </button>
      </header>

      <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-5">
        {images[activeIndex] ? (
          <img
            src={images[activeIndex]}
            alt={`Status photo ${activeIndex + 1}`}
            className="max-h-full max-w-full rounded-xl object-contain shadow-sm"
          />
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-56 w-56 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-brand-300 bg-white text-brand-600 hover:bg-brand-50 dark:border-brand-500/40 dark:bg-slate-900 dark:text-brand-400 dark:hover:bg-slate-800"
          >
            <PlusIcon size={32} />
            <span className="text-sm font-medium">Choose photos</span>
          </button>
        )}
      </div>

      <footer className="shrink-0 border-t border-slate-200 bg-white px-5 py-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex items-center gap-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy || images.length >= MAX_STATUS_IMAGES}
            className="grid h-[76px] w-[76px] shrink-0 place-items-center rounded-xl border-2 border-brand-300 text-brand-500 hover:bg-brand-50 disabled:opacity-40 dark:border-brand-500/50 dark:hover:bg-slate-800"
            aria-label="Add photos"
            title="Add photos"
          >
            <PlusIcon size={24} />
          </button>
          {images.map((image, index) => (
            <div key={`${index}-${image.slice(-24)}`} className="relative h-[76px] w-[76px] shrink-0">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-full w-full overflow-hidden rounded-xl border-2 ${activeIndex === index ? 'border-brand-500' : 'border-slate-200 dark:border-slate-700'}`}
                aria-label={`Preview photo ${index + 1}`}
              >
                <img src={image} alt="" className="h-full w-full object-cover" />
              </button>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-slate-800 text-white shadow"
                aria-label={`Remove photo ${index + 1}`}
              >
                <CloseIcon size={14} />
              </button>
            </div>
          ))}
        </div>

        {error && <p role="alert" className="mb-2 text-xs text-red-500">{error}</p>}
        <div className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={addImages}
          />
          <input
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && images.length > 0) publish();
            }}
            placeholder="Write a message ..."
            className="min-w-0 flex-1 rounded-xl bg-brand-50 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-brand-300 dark:bg-slate-800 dark:text-slate-100"
            aria-label="Status caption"
          />
          <button
            type="button"
            onClick={publish}
            disabled={images.length === 0 || busy}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-500 text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={isEditing ? 'Save status changes' : 'Post status'}
            title={isEditing ? 'Save status changes' : 'Post status'}
          >
            <SendIcon size={19} />
          </button>
        </div>
        {busy && <p className="mt-2 text-xs text-slate-400">Preparing photos...</p>}
      </footer>
    </section>
  );
}
