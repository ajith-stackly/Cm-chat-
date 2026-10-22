// Central mock data for the app. Avatars are the real photos from the Figma design.
import meAvatar from '../assets/images/me.png';
import pinkPandaAvatar from '../assets/images/pink-panda.jpg';
import dogHatAvatar from '../assets/images/dog-hat.jpg';
import cuteTurtleAvatar from '../assets/images/cut-turtle.jpg';
import coolSpiritAvatar from '../assets/images/cool-spirit.jpg';
import strangeCatAvatar from '../assets/images/strange-cat.jpg';
import fireFoxAvatar from '../assets/images/fire-fox.jpg';
import dineshAvatar from '../assets/images/dinesh.jpg';
import camelAvatar from '../assets/images/camel.png';
import horseAvatar from '../assets/images/horse.png';
import animalKingdomAvatar from '../assets/images/animal-kingdom.jpg';

export const me = {
  id: 'me',
  name: 'Shreyansh shah',
  phone: '+91 6363 636 936',
  about: 'Hey there, I am learning from coding monk',
  avatar: meAvatar,
};

export const contacts = [
  { id: 'c1', name: 'Pink Panda', avatar: pinkPandaAvatar, online: true, about: 'Living life one panda-step at a time' },
  { id: 'c2', name: 'Dog Hat', avatar: dogHatAvatar, online: false, lastSeen: 'today at 4:12 PM', about: "It's so quite outside" },
  { id: 'c3', name: 'Cute Turtle', avatar: cuteTurtleAvatar, online: false, lastSeen: 'yesterday at 9:03 PM', about: 'Slow and steady' },
  { id: 'c4', name: 'Cool spirit', avatar: coolSpiritAvatar, online: true, about: 'Look what I found' },
  { id: 'c5', name: 'strange cat', avatar: strangeCatAvatar, online: false, lastSeen: '2 days ago', about: 'Curious by nature' },
  { id: 'c6', name: 'Fire Fox', avatar: fireFoxAvatar, online: true, about: 'What does the fox say?' },
  { id: 'c7', name: 'Dinesh', avatar: dineshAvatar, online: false, lastSeen: 'yesterday at 21:29', about: 'Enjoy life to the fullest' },
  { id: 'c8', name: 'Camel', avatar: camelAvatar, online: true, about: 'Desert wanderer' },
  { id: 'c9', name: 'Horse', avatar: horseAvatar, online: true, about: 'Running free' },
];

export const contactById = (id) => contacts.find((c) => c.id === id);

const now = Date.now();
const minsAgo = (m) => now - m * 60000;

export const initialChats = [
  {
    id: 'c1', type: 'dm', contactId: 'c1', pinned: true, unread: 0, archived: false,
    messages: [
      { id: 'm1', from: 'c1', text: 'Hi 🥷, How are ya ?', time: minsAgo(500), status: 'read' },
      { id: 'm2', from: 'me', text: 'Hi 🐼 Panda, not bad, u ?', time: minsAgo(495), status: 'read' },
      { id: 'm3', from: 'me', text: 'Can you send me an abstarct image?', time: minsAgo(490), status: 'read' },
      { id: 'm4', from: 'c1', type: 'image', image: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=600&q=80', time: minsAgo(200), status: 'read', reaction: '🔥' },
      { id: 'm5', from: 'me', text: 'Can you send it as file ?', time: minsAgo(120), status: 'read' },
      { id: 'm6', from: 'c1', type: 'file', fileName: 'Abstract.png', fileSize: '2.4 MB', time: minsAgo(90), status: 'read' },
      { id: 'm7', from: 'me', text: 'Thnx!', time: minsAgo(60), status: 'delivered' },
    ],
  },
  {
    id: 'c2', type: 'dm', contactId: 'c2', pinned: true, unread: 2, archived: false,
    messages: [
      { id: 'm1', from: 'c2', text: "It's so quite outside today, perfect for a walk 🌤️", time: minsAgo(700), status: 'read' },
      { id: 'm2', from: 'me', text: 'Agreed! Might join you later.', time: minsAgo(690), status: 'read' },
      { id: 'm3', from: 'c2', text: 'Sounds good, let me know!', time: minsAgo(40), status: 'read' },
      { id: 'm4', from: 'c2', text: "It's so quite outside 😊", time: minsAgo(20), status: 'read' },
    ],
  },
  {
    id: 'c3', type: 'dm', contactId: 'c3', pinned: false, unread: 1, archived: false,
    messages: [
      { id: 'm1', from: 'c3', text: 'Are we still on for tomorrow?', time: minsAgo(300), status: 'read' },
      { id: 'm2', from: 'me', text: 'Yes! Same time.', time: minsAgo(290), status: 'read' },
      { id: 'm3', from: 'c3', text: "That's It. Goodbye!", time: minsAgo(15), status: 'read' },
    ],
  },
  {
    id: 'c4', type: 'dm', contactId: 'c4', pinned: false, unread: 0, archived: false,
    messages: [
      { id: 'm1', from: 'c4', text: 'Look what I found', time: minsAgo(80), status: 'read' },
      { id: 'm2', from: 'c4', type: 'image', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&q=80', time: minsAgo(78), status: 'read' },
    ],
  },
  {
    id: 'c5', type: 'dm', contactId: 'c5', pinned: false, unread: 0, archived: false,
    messages: [
      { id: 'm1', from: 'me', text: 'Hi, sorry to bother you...', time: minsAgo(1200), status: 'read' },
      { id: 'm2', from: 'c5', text: "No worries at all, what's up?", time: minsAgo(1190), status: 'read' },
    ],
  },
  {
    id: 'c6', type: 'dm', contactId: 'c6', pinned: false, unread: 0, archived: false,
    messages: [
      { id: 'm1', from: 'c6', text: 'What does the fox say?', time: minsAgo(2000), status: 'read' },
    ],
  },
];

export const initialGroups = [
  {
    id: 'g1', type: 'group', name: 'Animal Kingdom',
    members: ['c1', 'c4', 'c3', 'c6', 'c9'], avatar: animalKingdomAvatar, pinned: true, unread: 0, archived: false,
    messages: [
      { id: 'm1', from: 'c1', text: 'Hi, How are ya ?', time: minsAgo(500), status: 'read' },
      { id: 'm2', from: 'me', text: 'Hi Panda, not bad, u ?', time: minsAgo(495), status: 'read' },
      { id: 'm3', from: 'c4', type: 'image', image: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=600&q=80', time: minsAgo(200), status: 'read' },
      { id: 'm4', from: 'me', text: 'Can you send it as file ?', time: minsAgo(120), status: 'read' },
      { id: 'm5', from: 'c9', type: 'file', fileName: 'Abstract.png', fileSize: '2.4 MB', time: minsAgo(90), status: 'read' },
      { id: 'm6', from: 'me', text: 'Thnx!', time: minsAgo(60), status: 'delivered' },
    ],
  },
];

export const callLog = [
  { id: 'l1', contactId: 'c7', type: 'video', direction: 'outgoing', time: 'Yesterday, 21:29' },
  { id: 'l2', contactId: 'c2', type: 'voice', direction: 'outgoing', time: 'Yesterday, 16:53' },
  { id: 'l3', contactId: 'c3', type: 'voice', direction: 'outgoing', time: 'Yesterday, 16:53' },
  { id: 'l4', contactId: 'c4', type: 'video', direction: 'outgoing', time: 'Yesterday, 16:53' },
  { id: 'l5', contactId: 'c5', type: 'video', direction: 'outgoing', time: 'Yesterday, 16:53' },
];

export const statusUpdates = [
  {
    id: 's1', contactId: 'me', viewed: false, isMine: true,
    slides: [{ id: 'sl1', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80', time: '2h ago' }],
  },
  {
    id: 's2', contactId: 'c2', viewed: false,
    slides: [{ id: 'sl1', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80', time: '3h ago' }],
  },
  {
    id: 's3', contactId: 'c3', viewed: true,
    slides: [{ id: 'sl1', image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80', time: '10h ago' }],
  },
  {
    id: 's4', contactId: 'c4', viewed: true,
    slides: [{ id: 'sl1', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', time: '1d ago' }],
  },
];

export const wallpaperSwatches = [
  '#E9EAF2', '#0B141A', '#0E4A3A', '#0B4A6B', '#7A2E3A',
  '#9AA0AE', '#101314', '#31401F', '#9E1F63', '#1E8E7E',
  '#E4933D', '#C9C0F5', '#153A2E', '#D98CA6',
  '#3A3A3A', '#7A1FA2', '#5C6BC0', '#2E7D66', '#8D5A2B', '#28306B',
];

export const keyboardShortcuts = [
  { action: 'Mark as unread', keys: ['Ctrl', 'Shift', 'U'] },
  { action: 'Archive chat', keys: ['Ctrl', 'Shift', 'E'] },
  { action: 'Pin chat', keys: ['Ctrl', 'Shift', 'P'] },
  { action: 'Mute', keys: ['Ctrl', 'Shift', 'M'] },
  { action: 'Delete chat', keys: ['Ctrl', 'Shift', 'X'] },
  { action: 'Search', keys: ['Ctrl', 'F'] },
  { action: 'New chat', keys: ['Ctrl', 'N'] },
  { action: 'New Group', keys: ['Ctrl', 'Shift', 'N'] },
  { action: 'Search Chat', keys: ['Ctrl', 'Alt', 'F'] },
  { action: 'Previous Chat', keys: ['Ctrl', 'Shift', 'Tab'] },
  { action: 'Profile & About', keys: ['Ctrl', 'P'] },
  { action: 'Next Chat', keys: ['Ctrl', 'Tab'] },
  { action: 'Increase speed of voice message', keys: ['Shift', '.'] },
  { action: 'Decrease speed of voice message', keys: ['Shift', ','] },
  { action: 'Emoji Panel', keys: ['Ctrl', 'E'] },
  { action: 'Settings', keys: ['Ctrl', ','] },
  { action: 'Sticker Panel', keys: ['Ctrl', 'S'] },
];