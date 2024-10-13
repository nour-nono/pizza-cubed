import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Missing env variable: "MONGODB_URI"');
}

const client = new MongoClient(process.env.MONGODB_URI, {});
const clientPromise = client.connect();

export default clientPromise;
