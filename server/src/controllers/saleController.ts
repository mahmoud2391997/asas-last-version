
import { Request, Response } from 'express';
import { Sale } from '../models/sale';

export const createSale = async (req: Request, res: Response) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).send(sale);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await Sale.find().populate('customer').populate('product');
    res.send(sales);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getSaleById = async (req: Request, res: Response) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('customer').populate('product');
    if (!sale) {
      return res.status(404).send();
    }
    res.send(sale);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateSale = async (req: Request, res: Response) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!sale) {
      return res.status(404).send();
    }
    res.send(sale);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res.status(404).send();
    }
    res.send(sale);
  } catch (error) {
    res.status(500).send(error);
  }
};
