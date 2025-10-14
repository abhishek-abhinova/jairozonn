import { Newsletter } from '../models/newsletter.model.js';
import { sendNewsletterWelcomeEmail } from '../services/emailService.js';

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ success: false, message: 'Email already subscribed' });
    }

    // Create new subscriber
    const subscriber = new Newsletter({ email });
    await subscriber.save();

    // Send welcome email
    await sendNewsletterWelcomeEmail(email);

    res.status(201).json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter' 
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to subscribe to newsletter' 
    });
  }
};