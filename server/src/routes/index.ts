
import { Router } from 'express';
import supplierRoutes from './supplier';
import customerRoutes from './customer';
import branchRoutes from './branch';
import projectRoutes from './project';
import userRoutes from './user';
import saleRoutes from './sale';
import productRoutes from './product';
import purchaseRoutes from './purchase';

const router = Router();

router.use('/suppliers', supplierRoutes);
router.use('/customers', customerRoutes);
router.use('/branches', branchRoutes);
router.use('/projects', projectRoutes);
router.use('/users', userRoutes);
router.use('/sales', saleRoutes);
router.use('/products', productRoutes);
router.use('/purchases', purchaseRoutes);

export default router;
