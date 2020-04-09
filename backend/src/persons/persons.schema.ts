import * as mongoose from 'mongoose';

export const PersonSchema = new mongoose.Schema({
  name: String,
  email: String,
  friend: String,
});
