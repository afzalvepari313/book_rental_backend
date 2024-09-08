import { Request, Response } from 'express';
import { Transaction } from '../models/transactionModel';
import { User } from '../models/userModel';
import { Book } from '../models/bookModel';

export const issueBook = async (req: Request, res: Response) => {
  const { userId, bookId, issueDate } = req.body;
  try {
    if (!userId || !bookId || !issueDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const transaction = new Transaction({ userId, bookId, issueDate });
    await transaction.save();
    res.status(201).json({
      transaction,
      user: {
        _id: user._id, 
        username: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while issuing the book' });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  const { userId, bookId, returnDate } = req.body;
  if (!userId || !bookId || !returnDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const transaction = await Transaction.findOne({ userId, bookId, returnDate: { $exists: false } });
  if (transaction) {
    transaction.returnDate = returnDate;
    await transaction.save();

    const daysRented = Math.ceil((new Date(returnDate).getTime() - new Date(transaction.issueDate).getTime()) / (1000 * 3600 * 24));
    const book = await Book.findById(bookId);
    const totalRent = daysRented * (book?.rentPerDay || 0);
    
    res.status(200).json({ totalRent });
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
};

export const getTransactionHistory = async (req: Request, res: Response) => {
  const { bookId } = req.query;
  const transactions = await Transaction.find({ bookId }).populate('userId').populate('bookId');
  res.status(200).json(transactions);
};
