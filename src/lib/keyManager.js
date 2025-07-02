const STORAGE_KEY = "codealong_keys";
const SELECTED_KEY_ID = "codealong_selected_key_id";

export function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getLocalStorageItem(key) {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
}

function setLocalStorageItem(key, value) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, value);
}

export function getKeys() {
  const raw = getLocalStorageItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function setKeys(keys) {
  setLocalStorageItem(STORAGE_KEY, JSON.stringify(keys));
}

export async function verifyKeyWithRapidAPI(key) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch("https://judge0-ce.p.rapidapi.com/languages", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key.trim(),
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    return false;
  }
}

export async function addKey({ key, label }) {
  const trimmedKey = key.trim();
  const keys = getKeys();
  
  // Check if key already exists
  const keyExists = keys.some(k => k.key === trimmedKey);
  if (keyExists) {
    throw new Error("This API key has already been added");
  }

  const isValid = await verifyKeyWithRapidAPI(trimmedKey);
  if (!isValid) throw new Error("Invalid API key");

  const newKey = {
    id: Date.now().toString(),
    key: trimmedKey,
    label: label || "Unnamed Key",
    usage: 0,
    lastResetDate: getToday(),
    createdAt: Date.now(),
  };

  setKeys([...keys, newKey]);
  return newKey;
}

export function incrementUsage(keyId) {
  const keys = getKeys();
  const today = getToday();
  const updated = keys.map((k) =>
    k.id === keyId
      ? {
          ...k,
          usage: k.lastResetDate !== today ? 1 : k.usage + 1,
          lastResetDate: today,
        }
      : k
  );
  setKeys(updated);
}

export function selectKey(keyId) {
  setLocalStorageItem(SELECTED_KEY_ID, keyId);
}

export function getSelectedKey() {
  const id = getLocalStorageItem(SELECTED_KEY_ID);
  const keys = getKeys();
  return keys.find((k) => k.id === id) || null;
}

export function deleteKey(keyId) {
  const keys = getKeys().filter((k) => k.id !== keyId);
  setKeys(keys);
  if (getLocalStorageItem(SELECTED_KEY_ID) === keyId) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SELECTED_KEY_ID);
    }
  }
}

export function rotateSelectedKey() {
  const keys = getKeys();
  if (keys.length <= 1) return;
  const currentId = getLocalStorageItem(SELECTED_KEY_ID);
  const currentIndex = keys.findIndex((k) => k.id === currentId);
  const nextIndex = (currentIndex + 1) % keys.length;
  selectKey(keys[nextIndex].id);
  return keys[nextIndex];
}
