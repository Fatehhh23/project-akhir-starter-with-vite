import { openDB } from 'idb';

const DB_NAME = 'storyapp-db';
const STORE_NAME = 'favorites';

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

export async function saveItem(item) {
  const db = await dbPromise;
  return db.put(STORE_NAME, item);
}

export async function deleteItem(id) {
  const db = await dbPromise;
  return db.delete(STORE_NAME, id);
}

export async function getAllItems() {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
}
