export function previewText(convo) {
  const last = convo.messages[convo.messages.length - 1];
  if (!last) return 'No messages yet';
  const prefix = last.from === 'me' ? 'You: ' : '';
  if (last.type === 'image') return `${prefix}📷 Photo`;
  if (last.type === 'file') return `${prefix}📄 ${last.fileName}`;
  return `${prefix}${last.text}`;
}

export function lastTime(convo) {
  const last = convo.messages[convo.messages.length - 1];
  return last?.time;
}

export function dayLabel(ts) {
  const d = new Date(ts);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return 'Today';
  const yest = new Date(now);
  yest.setDate(now.getDate() - 1);
  if (d.toDateString() === yest.toDateString()) return 'Yesterday';
  return d.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
}

// Wallpaper colour that suits the active theme.
// Light swatches are turned into a dark tint of the same hue in dark mode,
// so the chat area never stays bright white inside a dark app.
export function themedWallpaper(hex, isDark) {
  if (!isDark || !/^#[0-9a-f]{6}$/i.test(hex || '')) return hex;
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let l = (max + min) / 2;
  if (l <= 0.3) return hex; // already dark enough
  const d = max - min;
  let h = 0;
  let sat = 0;
  if (d) {
    sat = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  sat = Math.min(sat, 0.45);
  l = 0.12;
  return `hsl(${Math.round(h)}, ${Math.round(sat * 100)}%, ${Math.round(l * 100)}%)`;
}
