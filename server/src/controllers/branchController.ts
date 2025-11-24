import { Request, Response } from 'express';
import { Branch } from '../models/branch';

export const createBranch = async (req: Request, res: Response) => {
  try {
    const branch = new Branch(req.body);
    await branch.save();
    res.status(201).send(branch);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getBranches = async (req: Request, res: Response) => {
  try {
    const branches = await Branch.find();
    res.send(branches);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getBranchById = async (req: Request, res: Response) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return res.status(404).send();
    }
    res.send(branch);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateBranch = async (req: Request, res: Response) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!branch) {
      return res.status(404).send();
    }
    res.send(branch);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if (!branch) {
      return res.status(404).send();
    }
    res.send(branch);
  } catch (error) {
    res.status(500).send(error);
  }
};