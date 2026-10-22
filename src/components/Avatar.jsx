export default function Avatar({ src, name, size = 44, online, className = '' }) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="w-full h-full rounded-full object-cover bg-slate-200 dark:bg-slate-700"
        loading="lazy"
      />
      {online && (
        <span
          className="absolute bottom-0 right-0 block rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"
          style={{ width: size * 0.27, height: size * 0.27 }}
        />
      )}
    </div>
  );
}
