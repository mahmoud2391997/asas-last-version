
import { Schema, model } from 'mongoose';

const purchaseSchema = new Schema({
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const Purchase = model('Purchase', purchaseSchema);
