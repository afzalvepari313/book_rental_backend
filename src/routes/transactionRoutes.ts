import { Router } from 'express';
import { issueBook, returnBook, getTransactionHistory } from '../controllers/transactionController';

const router = Router();

router.post('/issue', issueBook);
router.post('/return', returnBook);
router.get('/history', getTransactionHistory);

export default router;
