import { openDB } from 'idb';

const dbPromise = openDB('titleDB', 1, {
    upgrade(db) {
        db.createObjectStore('titles', {
            keyPath: 'id',
            autoIncrement: true,
        });
    },
});

export const addTitle = async (titleData) => {
    const db = await dbPromise;
    await db.add('titles', titleData);
};

export const getAllTitles = async () => {
    const db = await dbPromise;
    return db.getAll('titles');
};

export const clearTitles = async () => {
    const db = await dbPromise;
    await db.clear('titles');
};