import { Schema, model } from 'mongoose';
import { ProjectStatus, Urgency, BusinessVertical } from '../types';

const projectSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  projectName: { type: String, required: true },
  projectManager: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  projectStatus: { type: String, enum: Object.values(ProjectStatus), required: true },
  urgency: { type: String, enum: Object.values(Urgency), required: true },
  businessVertical: { type: String, enum: Object.values(BusinessVertical), required: true },
  projectDescription: { type: String, required: true },
  projectRequirements: { type: String, required: true },
  attachments: { type: [String] },
  notes: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: Number, required: true },
  actualCost: { type: Number, required: true },
});

export const Project = model('Project', projectSchema);