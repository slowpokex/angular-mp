import * as mongoose from 'mongoose';
import { random } from 'lodash';

import { CourseModel } from '../models/course.model';

export const CourseSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
    default: () => random(Number.MAX_SAFE_INTEGER, false)
  },
  title: {
    type: String,
    required: true,
  },
  creationDate: Date,
  duration: {
    type: Number,
    default: () => 0,
  },
  description: String,
  photoUrl: String,
  topRated: {
    type: Boolean,
    default: () => false,
  },
})
.pre('save', function(next) {
  (this as CourseModel).creationDate = new Date();
  next();
});
