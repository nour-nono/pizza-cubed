import { MongoClient } from 'mongodb';
import mongoose, { Mongoose } from 'mongoose';

type Cache = {
  client: Mongoose | null;
};

const cache: Cache = {
  client: null,
};

export async function mongoConnect(): Promise<MongoClient> {
  if (cache.client && cache.client.connection.readyState) {
    return cache.client.connection.getClient();
  }

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error('Missing env variables: "MONGODB_URI" Or "MONGODB_DB"');
  }

  const mongooseClient = await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  });

  cache.client = mongooseClient;

  return mongooseClient.connection.getClient();
}
