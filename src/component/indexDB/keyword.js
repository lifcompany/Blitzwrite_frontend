import { openDB } from 'idb';

const dbPromise = openDB('keywordDB', 1, {
    upgrade(db) {
        db.createObjectStore('keywords', {
            keyPath: 'id',
            autoIncrement: true,
        });
    },
});

export const addKeyword = async (keywordData) => {
    const db = await dbPromise;
    await db.add('keywords', keywordData);
};

export const getAllKeywords = async () => {
    const db = await dbPromise;
    return db.getAll('keywords');
};

export const clearKeywords = async () => {
    const db = await dbPromise;
    await db.clear('keywords');
};
