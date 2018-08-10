import { Document } from 'mongoose';

export interface CourseModel extends Document {
  id?: number;
  title?: string;
  creationDate?: Date;
  duration?: number;
  description?: string;
  photoUrl?: string;
  topRated?: boolean;
}
