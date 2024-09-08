import { Router } from 'express';
import {
    issueBook,
    returnBook,
    getBookDetails,
    getTotalRent,
    getUserBooks,
    getBooksByDateRange
} from '../controllers/transactionController';

const router = Router();

router.post('/issue', issueBook);
router.post('/return', returnBook);
router.get('/book/:bookName', getBookDetails);
router.get('/book/rent/:bookName', getTotalRent);
router.get('/user/:userId', getUserBooks);
router.get('/date-range', getBooksByDateRange);

export default router;
