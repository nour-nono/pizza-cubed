import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Missing env variable: "MONGODB_URI"');
}

const client = new MongoClient(process.env.MONGODB_URI, {});
const clientPromise = client.connect();

export async function MongoDBConnection() {
  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }
  return mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });
}
export default clientPromise;
