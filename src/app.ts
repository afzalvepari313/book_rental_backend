import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';
import transactionRoutes from './routes/transactionRoutes';

dotenv.config();

const app = express();
app.use(express.json());


// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

export default app;
