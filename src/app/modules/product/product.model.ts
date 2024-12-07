import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [30, 'Name cannot be more than 30 characters'],
      validate: {
        validator: function (value) {
          return value
            .split(' ')
            .every((word: string) => /^[A-Z][a-zA-Z0-9]*$/.test(word));
        },
        message:
          'The name must be in title case, e.g., "Xtreme Mountain Bike".',
      },
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
      validate: {
        validator: function (value) {
          const CapitalizeValue =
            value.charAt(0).toUpperCase() + value.slice(1);
          return value === CapitalizeValue;
        },
        message: `{VALUE} is invalid! Brand must be in Capitalize, e.g., "Xtreme".`,
      },
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price must be a positive number'],
    },
    category: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        message:
          '{VALUE} is invalid! Category can only be "Mountain", "Road", "Hybrid", or "Electric"',
      },
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [100, 'Description cannot be more than 100 characters'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a positive number'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Stock is required'],
    },
  },
  { timestamps: true },
);

export const Product = model<TProduct>('Product', productSchema);
