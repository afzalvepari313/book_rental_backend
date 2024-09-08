import mongoose, { Schema, Document } from 'mongoose';

interface ITransaction extends Document {
  userId: Schema.Types.ObjectId;
  bookName: string;
  issueDate: Date;
  returnDate?: Date;
  rent?: number;
}

const transactionSchema = new Schema<ITransaction>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookName: { type: String, required: true },
  rent: { type: Number},
  issueDate: { type: Date},
  returnDate: { type: Date },
});

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);