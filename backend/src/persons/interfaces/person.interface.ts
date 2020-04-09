import { Document } from 'mongoose';

export interface Person extends Document {
  readonly name: string;
  readonly email: string;
  readonly friend: string;
}
