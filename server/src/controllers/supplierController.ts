import { Request, Response } from 'express';
import { Supplier } from '../models/supplier';

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).send(supplier);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.find();
    res.send(suppliers);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).send();
    }
    res.send(supplier);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!supplier) {
      return res.status(404).send();
    }
    res.send(supplier);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).send();
    }
    res.send(supplier);
  } catch (error) {
    res.status(500).send(error);
  }
};