import connectDB from "./database/index.js";

export default async function main() {
  try {
    await connectDB();
  } catch (err) {
    console.log('Database connection failed: ', err)
  }
}