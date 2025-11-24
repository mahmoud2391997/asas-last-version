import { Router } from 'express';
import { createBranch, getBranches, getBranchById, updateBranch, deleteBranch } from '../controllers/branchController';

const router = Router();

router.post('/', createBranch);
router.get('/', getBranches);
router.get('/:id', getBranchById);
router.patch('/:id', updateBranch);
router.delete('/:id', deleteBranch);

export default router;