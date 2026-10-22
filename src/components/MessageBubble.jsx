import { CheckCheckIcon, CheckIcon, DownloadIcon, FileIcon, StarIcon } from '../assets/icons/Icons';

function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function MessageBubble({ message, isMe, senderName, starred, onToggleStar }) {
  const bubbleBase = 'max-w-[78%] sm:max-w-[65%] rounded-2xl px-3.5 py-2 shadow-sm relative group';
  const mine = isMe
    ? 'bg-brand-500 text-white rounded-br-md'
    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-md';

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} px-2 sm:px-4`}>
      <div className={`${bubbleBase} ${mine} animate-slideUp`}>
        {!isMe && senderName && (
          <p className="text-[12px] font-semibold text-brand-600 dark:text-brand-400 mb-0.5">{senderName}</p>
        )}

        {message.type === 'image' && (
          <div className="mb-1 -mx-0.5 -mt-0.5">
            <img src={message.image} alt="shared" className="rounded-xl max-h-64 w-full object-cover" loading="lazy" />
          </div>
        )}

        {message.type === 'file' && (
          <div className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 mb-1 ${isMe ? 'bg-white/15' : 'bg-slate-100 dark:bg-slate-700'}`}>
            <div className={`w-9 h-9 rounded-lg grid place-items-center shrink-0 ${isMe ? 'bg-white/20' : 'bg-white dark:bg-slate-600'}`}>
              <FileIcon size={17} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium truncate">{message.fileName}</p>
              <p className={`text-[11px] ${isMe ? 'text-white/75' : 'text-slate-400'}`}>{message.fileSize}</p>
            </div>
            <DownloadIcon size={17} className="shrink-0" />
          </div>
        )}

        {message.text && <p className="text-[14.5px] leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>}

        <div className={`flex items-center gap-1 justify-end mt-1 ${isMe ? 'text-white/75' : 'text-slate-400'}`}>
          {starred && <StarIcon size={11} className="fill-current" />}
          <span className="text-[10.5px]">{fmtTime(message.time)}</span>
          {isMe && (message.status === 'read'
            ? <CheckCheckIcon size={14} className="text-sky-200" />
            : message.status === 'delivered'
              ? <CheckCheckIcon size={14} />
              : <CheckIcon size={14} />)}
        </div>

        {message.reaction && (
          <span className="absolute -bottom-3 right-2 bg-white dark:bg-slate-700 rounded-full shadow px-1.5 py-0.5 text-xs border border-slate-100 dark:border-slate-600">
            {message.reaction}
          </span>
        )}

        <button
          onClick={onToggleStar}
          className={`hidden group-hover:flex absolute top-1 ${isMe ? '-left-7' : '-right-7'} w-6 h-6 rounded-full bg-white dark:bg-slate-700 shadow items-center justify-center text-slate-400 hover:text-amber-500`}
          title={starred ? 'Unstar' : 'Star message'}
        >
          <StarIcon size={12} className={starred ? 'fill-amber-400 text-amber-400' : ''} />
        </button>
      </div>
    </div>
  );
}
