import { MongoClient, Db } from 'mongodb';

let db: Db;

export async function connectToMongoDB() {
  try {
      const client = await MongoClient.connect('mongodb://localhost:27017/Perrinder');
      db = client.db();
  } catch (err) {
      console.log('Error connecting to MongoDB:', err);
      throw err; // Propagate the error to the caller
  }
}


export function getDB(): Db {
    if (!db) {
        throw new Error('Database connection has not been established. Make sure to call connectToMongoDB first.');
    }
    return db;
}
