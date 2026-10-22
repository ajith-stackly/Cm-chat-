import { useState, useRef } from 'react';
import { PaperclipIcon, SmileyIcon, SendIcon, MicIcon } from '../assets/icons/Icons';

const QUICK_EMOJIS = ['😀', '😂', '😍', '👍', '🙏', '🔥', '🎉', '😢', '❤️', '😮', '🥳', '👏'];

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const fileRef = useRef(null);

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend({ type: 'text', text: trimmed });
    setText('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => onSend({ type: 'image', image: reader.result });
      reader.readAsDataURL(file);
    } else {
      const sizeKB = file.size / 1024;
      const sizeLabel = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB.toFixed(0)} KB`;
      onSend({ type: 'file', fileName: file.name, fileSize: sizeLabel });
    }
    e.target.value = '';
  };

  return (
    <div className="relative px-3 sm:px-4 py-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
      {showEmoji && (
        <div className="absolute bottom-16 left-3 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 p-3 grid grid-cols-6 gap-1.5 animate-popIn origin-bottom-left z-20">
          {QUICK_EMOJIS.map((em) => (
            <button
              key={em}
              onClick={() => { setText((t) => t + em); setShowEmoji(false); }}
              className="text-xl hover:scale-125 transition-transform"
            >
              {em}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-end gap-2">
        <button onClick={() => fileRef.current?.click()} className="w-9 h-9 shrink-0 grid place-items-center rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" title="Attach">
          <PaperclipIcon size={19} />
        </button>
        <input type="file" ref={fileRef} onChange={handleFile} className="hidden" />

        <div className="flex-1 flex items-end gap-2 bg-slate-100 dark:bg-slate-800 rounded-2xl px-3.5 py-2">
          <textarea
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Write a message ..."
            className="flex-1 bg-transparent resize-none outline-none text-[14.5px] max-h-28 text-slate-700 dark:text-slate-100 placeholder:text-slate-400"
          />
          <button onClick={() => setShowEmoji((v) => !v)} className="text-slate-400 hover:text-brand-500 shrink-0" title="Emoji">
            <SmileyIcon size={19} />
          </button>
        </div>

        {text.trim() ? (
          <button onClick={submit} className="w-10 h-10 shrink-0 grid place-items-center rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-colors" title="Send">
            <SendIcon size={17} />
          </button>
        ) : (
          <button className="w-10 h-10 shrink-0 grid place-items-center rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-colors" title="Record voice message">
            <MicIcon size={17} />
          </button>
        )}
      </div>
    </div>
  );
}
