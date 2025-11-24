import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  balance: { type: Number, required: true },
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch' },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  addedBy: { type: String, required: true },
});

export const Customer = model('Customer', customerSchema);