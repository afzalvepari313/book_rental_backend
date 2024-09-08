import mongoose, { Schema, Document } from 'mongoose';

interface IBook extends Document {
  name: string;
  category: string;
  rentPerDay: number;
}

const bookSchema = new Schema<IBook>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  rentPerDay: { type: Number, required: true },
});

export const Book = mongoose.model<IBook>('Book', bookSchema);
