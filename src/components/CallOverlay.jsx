import { useEffect, useState } from 'react';
import Avatar from './Avatar';
import { PhoneIcon, VideoIcon, MicIcon } from '../assets/icons/Icons';

export default function CallOverlay({ call, me, contact, onEnd }) {
  const [stage, setStage] = useState('connecting'); // connecting -> live
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setStage('connecting');
    setSeconds(0);
    const t1 = setTimeout(() => setStage('live'), 2200);
    return () => clearTimeout(t1);
  }, [call]);

  useEffect(() => {
    if (stage !== 'live') return;
    const iv = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [stage]);

  if (!call) return null;
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900 flex flex-col items-center justify-center animate-fadeIn">
      {call.type === 'video' && stage === 'live' ? (
        <img
          src={contact.avatar}
          alt={contact.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      ) : null}

      <div className="relative z-10 flex flex-col items-center gap-4">
        {stage === 'connecting' ? (
          <div className="flex items-center gap-10">
            <div className="flex flex-col items-center gap-3">
              <Avatar src={me.avatar} name={me.name} size={90} />
              <span className="text-white/80 text-sm">{me.name.split(' ')[0]}</span>
            </div>
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            <div className="flex flex-col items-center gap-3">
              <Avatar src={contact.avatar} name={contact.name} size={90} />
              <span className="text-white/80 text-sm">{contact.name}</span>
            </div>
          </div>
        ) : (
          <>
            <Avatar src={contact.avatar} name={contact.name} size={110} />
            <p className="text-white text-xl font-semibold">{contact.name}</p>
          </>
        )}

        <p className="text-white/70 text-sm">
          {stage === 'connecting' ? 'Connecting…' : `${call.type === 'video' ? 'Video call' : 'Voice call'} · ${mm}:${ss}`}
        </p>
      </div>

      <div className="absolute bottom-14 flex items-center gap-6 z-10">
        {call.type === 'video' && (
          <button className="w-14 h-14 rounded-full bg-white/15 text-white grid place-items-center hover:bg-white/25 transition-colors">
            <VideoIcon size={22} />
          </button>
        )}
        <button className="w-14 h-14 rounded-full bg-white/15 text-white grid place-items-center hover:bg-white/25 transition-colors">
          <MicIcon size={22} />
        </button>
        <button onClick={onEnd} className="w-16 h-16 rounded-full bg-red-500 text-white grid place-items-center hover:bg-red-600 transition-colors rotate-[135deg]">
          <PhoneIcon size={24} />
        </button>
      </div>
    </div>
  );
}
