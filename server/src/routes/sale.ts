import { Router } from 'express';
import { createSale, getSales, getSaleById, updateSale, deleteSale } from '../controllers/saleController';

const router = Router();

router.post('/', createSale);
router.get('/', getSales);
router.get('/:id', getSaleById);
router.patch('/:id', updateSale);
router.delete('/:id', deleteSale);

export default router;