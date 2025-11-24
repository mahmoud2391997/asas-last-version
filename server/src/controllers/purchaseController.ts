
import { Request, Response } from 'express';
import { Purchase } from '../models/purchase';

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.status(201).send(purchase);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await Purchase.find().populate('supplier').populate('product');
    res.send(purchases);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const purchase = await Purchase.findById(req.params.id).populate('supplier').populate('product');
    if (!purchase) {
      return res.status(404).send();
    }
    res.send(purchase);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updatePurchase = async (req: Request, res: Response) => {
  try {
    const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!purchase) {
      return res.status(404).send();
    }
    res.send(purchase);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deletePurchase = async (req: Request, res: Response) => {
  try {
    const purchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!purchase) {
      return res.status(404).send();
    }
    res.send(purchase);
  } catch (error) {
    res.status(500).send(error);
  }
};
