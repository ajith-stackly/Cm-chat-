// Lightweight inline SVG icon set (Phosphor-style, stroke based)
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const wrap = (paths, props) => (
  <svg viewBox="0 0 24 24" width={props?.size || 20} height={props?.size || 20} {...base} className={props?.className}>
    {paths}
  </svg>
);

export const ChatIcon = (p) => wrap(<path d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.3-3.5A7.96 7.96 0 0 1 4 12Z" />, p);
export const UsersIcon = (p) => wrap(<><circle cx="9" cy="8" r="3" /><path d="M2.5 19c.7-3 3-5 6.5-5s5.8 2 6.5 5" /><circle cx="17" cy="8.5" r="2.5" /><path d="M15.5 14.3c2.6.4 4.3 2.1 4.9 4.7" /></>, p);
export const PhoneIcon = (p) => wrap(<path d="M5.5 4h3l1.5 4-2 1.6a12 12 0 0 0 6.4 6.4l1.6-2 4 1.5v3c0 1-.9 1.8-1.9 1.6C10.7 19.1 4.9 13.3 3.9 6.4 3.7 5.3 4.5 4.4 5.5 4Z" />, p);
export const GearIcon = (p) => wrap(<><circle cx="12" cy="12" r="3" /><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 8.8 18a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H2.5a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.2 7.5a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H8.9a1.7 1.7 0 0 0 1-1.6V1.3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.6 1h.2a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z" /></>, p);
export const SearchIcon = (p) => wrap(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></>, p);
export const FilterIcon = (p) => wrap(<path d="M4 5h16M7 12h10M10 19h4" />, p);
export const ArchiveIcon = (p) => wrap(<><rect x="3" y="4" width="18" height="5" rx="1.5" /><path d="M5 9v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" /><path d="M10 13h4" /></>, p);
export const BackIcon = (p) => wrap(<path d="M15 5l-7 7 7 7" />, p);
export const CloseIcon = (p) => wrap(<path d="M6 6l12 12M18 6 6 18" />, p);
export const VideoIcon = (p) => wrap(<><rect x="2.5" y="6" width="13" height="12" rx="2" /><path d="m21.5 8.2-5 3.1v1.4l5 3.1V8.2Z" /></>, p);
export const CallOutIcon = (p) => wrap(<path d="M5.5 4h3l1.5 4-2 1.6a12 12 0 0 0 6.4 6.4l1.6-2 4 1.5v3c0 1-.9 1.8-1.9 1.6C10.7 19.1 4.9 13.3 3.9 6.4 3.7 5.3 4.5 4.4 5.5 4Z" />, p);
export const DotsIcon = (p) => wrap(<><circle cx="12" cy="6" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="18" r="1.4" fill="currentColor" stroke="none" /></>, p);
export const ChevronDownIcon = (p) => wrap(<path d="m6 9 6 6 6-6" />, p);
export const ChevronRightIcon = (p) => wrap(<path d="m9 6 6 6-6 6" />, p);
export const PaperclipIcon = (p) => wrap(<path d="M8 12.5 15.3 5a3 3 0 0 1 4.2 4.2l-8.6 8.6a5 5 0 0 1-7-7l7.9-7.9" />, p);
export const SmileyIcon = (p) => wrap(<><circle cx="12" cy="12" r="9" /><path d="M8.5 10.2h.01M15.5 10.2h.01" strokeWidth={2.4} /><path d="M8 14.5c1 1.3 2.4 2 4 2s3-.7 4-2" /></>, p);
export const SendIcon = (p) => wrap(<path d="M4 11 20 4l-6.5 16-3-6.5L4 11Z" />, p);
export const DownloadIcon = (p) => wrap(<><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 19.5h14" /></>, p);
export const PlusIcon = (p) => wrap(<path d="M12 5v14M5 12h14" />, p);
export const CheckIcon = (p) => wrap(<path d="M4 12.5l5 5L20 6" />, p);
export const CheckCheckIcon = (p) => wrap(<><path d="m2.5 12.5 4 4L14 8" /><path d="m10 12.5 4 4L21.5 8" /></>, p);
export const StarIcon = (p) => wrap(<path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.1 1.4-6.3-4.8-4.3 6.4-.6L12 3Z" />, p);
export const PinIcon = (p) => wrap(<><path d="M14.5 3.5 20.5 9.5 17 13l-.5 5-3-3-5 5-1-1 5-5-3-3 5-.5 3.5-3.5Z" /></>, p);
export const TrashIcon = (p) => wrap(<><path d="M4 7h16" /><path d="M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7" /><path d="M6 7l1 13a2 2 0 0 0 2 1.8h6a2 2 0 0 0 2-1.8l1-13" /></>, p);
export const BlockIcon = (p) => wrap(<><circle cx="12" cy="12" r="9" /><path d="m6 6 12 12" /></>, p);
export const BellIcon = (p) => wrap(<><path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z" /><path d="M10 19a2 2 0 0 0 4 0" /></>, p);
export const BellOffIcon = (p) => wrap(<><path d="M6 10a6 6 0 0 1 9-5.2M18 10c0 4 1.5 5.5 1.5 5.5H8" /><path d="M10 19a2 2 0 0 0 4 0" /><path d="m3 3 18 18" /></>, p);
export const LockIcon = (p) => wrap(<><rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" /></>, p);
export const ShieldIcon = (p) => wrap(<path d="M12 3 5 5.5v6c0 5 3 8.2 7 9.5 4-1.3 7-4.5 7-9.5v-6L12 3Z" />, p);
export const PaletteIcon = (p) => wrap(<><path d="M12 21a9 9 0 1 1 0-18c4.5 0 8.5 3 8.9 7-.3 1.6-1.6 2.4-3.1 2.2-1-.1-1.9.6-1.9 1.6 0 .5.2.9.5 1.2.6.7.3 1.8-.6 2-1.2.3-2.5.5-3.8 0" /><circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" /><circle cx="10.5" cy="7" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="8" r="1" fill="currentColor" stroke="none" /></>, p);
export const ImageIcon = (p) => wrap(<><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="m5 18 5-5.5 3 3 2.5-3L21 18" /></>, p);
export const InfoIcon = (p) => wrap(<><circle cx="12" cy="12" r="9" /><path d="M12 11v6" /><path d="M12 7.5h.01" strokeWidth={2.4} /></>, p);
export const HelpIcon = (p) => wrap(<><circle cx="12" cy="12" r="9" /><path d="M9.3 9a2.7 2.7 0 1 1 3.9 2.4c-.9.5-1.2 1-1.2 2" /><path d="M12 17h.01" strokeWidth={2.4} /></>, p);
export const KeyboardIcon = (p) => wrap(<><rect x="2.5" y="6" width="19" height="12" rx="2" /><path d="M6 10h.01M9 10h.01M12 10h.01M15 10h.01M18 10h.01M7 14h10" /></>, p);
export const FileIcon = (p) => wrap(<><path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v4h4" /></>, p);
export const ClipboardIcon = (p) => wrap(<><rect x="5" y="4.5" width="14" height="17" rx="1.5" /><path d="M9 4.5V3h6v1.5M9 10h6M9 14h6" /></>, p);
export const MicIcon = (p) => wrap(<><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0" /><path d="M12 19v2" /></>, p);
export const LinkIcon = (p) => wrap(<><path d="M9.5 14.5 14.5 9.5" /><path d="M11 6.5 12.6 5a3.5 3.5 0 0 1 5 5L16 11.5" /><path d="M13 17.5 11.4 19a3.5 3.5 0 0 1-5-5L8 12.5" /></>, p);
export const ReplyIcon = (p) => wrap(<path d="M10 8 4 13l6 5v-3.3c5.7 0 8.5 1.5 10.5 5.3.5-6.8-2.5-11-10.5-11V8Z" />, p);
export const EmojiPlusIcon = (p) => wrap(<><circle cx="10.5" cy="12" r="7.5" /><path d="M7.7 11h.01M13.3 11h.01" strokeWidth={2.2} /><path d="M7.5 14.2c.8 1 1.8 1.5 3 1.5s2.2-.5 3-1.5" /><path d="M18.5 5v6M15.5 8h6" /></>, p);
export const SunIcon = (p) => wrap(<><circle cx="12" cy="12" r="4.5" /><path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></>, p);
export const MoonIcon = (p) => wrap(<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />, p);
export const LaptopIcon = (p) => wrap(<><rect x="4" y="4.5" width="16" height="10.5" rx="1.5" /><path d="M2 19.5h20" /></>, p);
export const LogoutIcon = (p) => wrap(<><path d="M9 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-2" /><path d="M3 12h11" /><path d="m10.5 8.5 3.5 3.5-3.5 3.5" /></>, p);
export const CameraIcon = (p) => wrap(<><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13.5" r="3.2" /></>, p);
export const EditIcon = (p) => wrap(<><path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z" /><path d="M13.5 8 16 10.5" /></>, p);
export const SlashIcon = (p) => wrap(<circle cx="12" cy="12" r="9" />, p);
