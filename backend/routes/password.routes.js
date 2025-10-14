import express from 'express';
import { sendResetOTP, resetPassword } from '../controllers/password.controller.js';

const router = express.Router();

router.post('/send-otp', sendResetOTP);
router.post('/reset', resetPassword);

export default router;