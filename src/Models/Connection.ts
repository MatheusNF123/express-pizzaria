import mongoose from 'mongoose';
import 'dotenv/config';

const { MONGO_URI = 'mongodb://localhost:27017/pizzaria' } = process.env;

const connectToDatabase = (
  mongoDatabaseURI = MONGO_URI,
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;