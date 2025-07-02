// const STORAGE_KEY = 'playlist-progress';

// export function getCompletedVideos(slug) {
//   if (typeof window === 'undefined') return [];
//   const raw = localStorage.getItem(STORAGE_KEY);
//   const data = raw ? JSON.parse(raw) : {};
//   return data[slug] || [];
// }

// export function markVideoComplete(slug, index) {
//   if (typeof window === 'undefined') return;
//   const raw = localStorage.getItem(STORAGE_KEY);
//   const data = raw ? JSON.parse(raw) : {};

//   if (!data[slug]) data[slug] = [];
//   if (!data[slug].includes(index)) data[slug].push(index);

//   localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
// }

const STORAGE_KEY = 'playlist-progress';

export function getCompletedVideos(slug) {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  const data = raw ? JSON.parse(raw) : {};
  return data[slug] || [];
}

export function markVideoComplete(slug, index) {
  if (typeof window === 'undefined') return;
  const raw = localStorage.getItem(STORAGE_KEY);
  const data = raw ? JSON.parse(raw) : {};

  if (!data[slug]) data[slug] = [];
  if (!data[slug].includes(index)) data[slug].push(index);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearVideoComplete(slug, index) {
  if (typeof window === 'undefined') return;
  const raw = localStorage.getItem(STORAGE_KEY);
  const data = raw ? JSON.parse(raw) : {};
  if (!data[slug]) return;

  data[slug] = data[slug].filter((i) => i !== index);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
