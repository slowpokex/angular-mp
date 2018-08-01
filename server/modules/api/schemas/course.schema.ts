import * as mongoose from 'mongoose';

import { CourseModel } from '../models/course.model';

export const CourseSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  title: String,
  creationDate: Date,
  duration: Number,
  description: String,
  photoUrl: String,
  topRated: Boolean,
})
.pre('save', function(next) {
  (this as CourseModel).creationDate = new Date();
  next();
});
