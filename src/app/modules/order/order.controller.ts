import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await OrderServices.createOrderIntoDB(orderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      daa: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Validation failed',
      error: err,
      stack: err.stack || 'No stack trace available',
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getRevenueFromDB();
    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const OrderController = {
  createOrder,
  getRevenue,
};
