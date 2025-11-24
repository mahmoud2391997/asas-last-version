import { Schema, model } from 'mongoose';

const supplierSchema = new Schema({
  code: String,
  name: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  balance: { type: Number, required: true },
});

export const Supplier = model('Supplier', supplierSchema);