import { Document } from 'mongoose';

export interface Person extends Document {
  name: string;
  email: string;
}
