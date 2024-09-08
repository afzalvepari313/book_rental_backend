import { Router } from 'express';
import { getBooksByName, getBooksByRent, getBooksByCategoryAndRent, getAllBooks, addBook } from '../controllers/bookController';

const router = Router();

router.get('/search', getBooksByName);
router.post('/addBook', addBook);
router.get('/getAllBooks', getAllBooks);
router.get('/rent', getBooksByRent);
router.get('/category-rent', getBooksByCategoryAndRent);

export default router;
