import { Model, Document, Types } from 'mongoose';

export interface IOrder extends Document {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
}

export type ProductModel = Model<IOrder>;