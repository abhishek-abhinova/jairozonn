import express from 'express';
import { createPaymentIntent, confirmPayment, createPayPalOrder } from '../controllers/payment.controller.js';
import { authUser } from '../middlewares/authUser.js';

const router = express.Router();

router.post('/create-payment-intent', authUser, createPaymentIntent);
router.post('/confirm-payment', authUser, confirmPayment);
router.post('/paypal-order', authUser, createPayPalOrder);

export default router;