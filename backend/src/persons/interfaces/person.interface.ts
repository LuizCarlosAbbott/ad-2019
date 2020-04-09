import { Document } from 'mongoose';

export interface Person extends Document {
  id: string;
  name: string;
  email: string;
}
