import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

// will call controller method

router.post('/', OrderController.createOrder);
router.get('/revenue', OrderController.getRevenue);

export const orderRoutes = router;
