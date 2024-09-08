import mongoose, { Schema, Document } from 'mongoose';

interface ITransaction extends Document {
  userId: Schema.Types.ObjectId;
  bookId: Schema.Types.ObjectId;
  issueDate: Date;
  returnDate?: Date;
}

const transactionSchema = new Schema<ITransaction>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date },
});

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);