import { Schema, model } from 'mongoose';

const branchSchema = new Schema({
  name: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

export const Branch = model('Branch', branchSchema);