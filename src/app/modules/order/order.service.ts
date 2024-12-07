import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (order: IOrder) => {
  const { product, quantity } = order;
  const foundProduct = await Product.findById(product);

  if (!foundProduct) {
    throw new Error('Product not found');
  }

  if (quantity > foundProduct.quantity) {
    throw new Error(
      `Insufficient product quantity. Available: ${foundProduct.quantity}, Ordered: ${quantity}`,
    );
  }

  foundProduct.quantity -= quantity;
  foundProduct.inStock = foundProduct.quantity > 0;

  await foundProduct.save();
  const result = await Order.create(order);
  return result;
};

const getRevenueFromDB = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },

    {
      $project: {
        _id: 0,
      },
    },
  ]);
  return result;
};
export const OrderServices = {
  createOrderIntoDB,
  getRevenueFromDB,
};
