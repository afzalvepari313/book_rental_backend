import { Request, Response } from 'express';
import { Book } from '../models/bookModel';

export const getBooksByName = async (req: Request, res: Response) => {
  const { name } = req.query;
  const books = await Book.find({ name: new RegExp(name as string, 'i') });
  res.status(200).json(books);
};

export const getAllBooks = async (req: Request, res: Response) => {
    const books = await Book.find();
  res.status(200).json(books);
}

export const addBook = async (req: Request, res: Response) => {
    try {
      const { name, category, rentPerDay } = req.body;
  
      // Validate required fields
      if (!name || !category || !rentPerDay) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      // Create a new book object
      const newBook = new Book({
        name,
        category,
        rentPerDay,
      });
  
      // Save the book to the database
      await newBook.save();
      res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
      res.status(500).json({   
   error: 'An error occurred while adding the book' });
    }
  };

export const getBooksByRent = async (req: Request, res: Response) => {
  const { minRent, maxRent } = req.query;
  const books = await Book.find({ rentPerDay: { $gte: minRent, $lte: maxRent } });
  res.status(200).json(books);
};

// export const getBooksByCategoryAndRent = async (req: Request, res: Response) => {
//   const { category, name, minRent, maxRent } = req.query;
//   // Validate query parameters
//   if (!category || !name) {
//     return res.status(400).json({ error: 'Missing required query parameters' });
//   }

//   const books = await Book.find({
//     category: new RegExp(category as string, 'i'),
//     name: new RegExp(name as string, 'i'),
//     rentPerDay: { $gte: minRent, $lte: maxRent }
//   });
//   res.status(200).json(books);
// };

export const getBooksByCategoryAndRent = async (req: Request, res: Response) => {
    const { category, name, minRent, maxRent } = req.query;
  
    // Validate query parameters
    if (!category || !minRent || !maxRent) {
      return res.status(400).json({ error: 'Missing required query parameters' });
    }
  
    const filter: any = {
      category: new RegExp(category as string, 'i'),
      name: new RegExp(name as string, 'i')
    };
  
    if (minRent && maxRent) {
      filter.rentPerDay = { $gte: Number(minRent), $lte: Number(maxRent) };
    }
  
    const books = await Book.find(filter);
    res.status(200).json(books);
  };