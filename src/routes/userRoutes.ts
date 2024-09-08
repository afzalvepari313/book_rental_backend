import { Router } from 'express';
import { getUsers, addUser } from '../controllers/userController';

const router = Router();
router.post('/addUser', addUser);
router.get('/getAllusers', getUsers);

export default router;
