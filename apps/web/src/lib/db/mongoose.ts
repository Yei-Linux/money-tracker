import { envs } from '../../constants/env';
import mongoose from 'mongoose';

const MONGODB_URI = envs.MONGO_URI;
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
}

let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  try {
    if (cached.conn) {
      return cached.conn;
    }
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };
      cached.promise = mongoose
        .connect(MONGODB_URI as string, opts)
        .then((mongoose) => {
          console.log('Db connected');
          return mongoose;
        });
    }
    try {
      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }

    return cached.conn;
  } catch (error) {}
}

export default dbConnect;
