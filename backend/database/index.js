import mongoose from "mongoose";
import { dbConfig } from "../config/dbConfig.js";

async function connectMango() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(dbConfig.mongoURI);
    console.log('Connected to MongoDB!')
  } catch (err) {
    console.error('Error connecting to MongoDB: ', err)
  }
}

export default async function connectDB() {
  if(dbConfig.type === 'mongo') {
    return await connectMango();
  } else {
    throw new Error(`Unsupported database type: ${dbConfig.type}`)
  }
}