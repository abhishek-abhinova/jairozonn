import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'jairosoft@gmail.com',
      pass: process.env.EMAIL_PASS || 'your_app_password_here'
    }
  });
};

export const sendProfileUpdateEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'jairosoft@gmail.com',
      to: userEmail,
      subject: 'Profile Updated - Jairozon',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #667eea; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Jairozon</h1>
          </div>
          <div style="padding: 30px;">
            <h2>Hi ${userName}!</h2>
            <p>Your profile has been updated successfully.</p>
            <a href="http://localhost:5173/profile" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Profile</a>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Profile update email sent');
  } catch (error) {
    console.error('Email error:', error);
  }
};

export const sendAdminUpdateEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'jairosoft@gmail.com',
      to: userEmail,
      subject: 'Account Updated by Admin - Jairozon',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #667eea; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Jairozon</h1>
          </div>
          <div style="padding: 30px;">
            <h2>Hi ${userName}!</h2>
            <p>Your account has been updated by admin.</p>
            <a href="http://localhost:5173/profile" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Profile</a>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Admin update email sent');
  } catch (error) {
    console.error('Email error:', error);
  }
};

// Newsletter Welcome Email
export const sendNewsletterWelcomeEmail = async (userEmail) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'jairosoft@gmail.com',
      to: userEmail,
      subject: '🎉 Welcome to Jairozon Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <div style="padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px;">📚 Jairozon</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0;">Educational Excellence</p>
          </div>
          <div style="background: white; padding: 40px 30px; border-radius: 10px 10px 0 0;">
            <h2 style="color: #333; margin-bottom: 20px;">Welcome to Our Community! 🎉</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Thank you for subscribing to the Jairozon newsletter! You're now part of our educational community.</p>
            <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #667eea; margin-top: 0;">What to Expect:</h3>
              <ul style="color: #666; line-height: 1.8;">
                <li>📖 Latest book recommendations</li>
                <li>🎯 Exclusive discounts and offers</li>
                <li>📚 Educational tips and resources</li>
                <li>🚀 New arrivals and bestsellers</li>
              </ul>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/books" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Explore Books 📚</a>
            </div>
            <p style="color: #999; font-size: 14px; text-align: center;">You can unsubscribe at any time by clicking the link in our emails.</p>
          </div>
          <div style="background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
            <p style="margin: 0; font-size: 14px;">© ${new Date().getFullYear()} Jairozon - Educational Books</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Newsletter welcome email sent');
  } catch (error) {
    console.error('Newsletter email error:', error);
  }
};

// Registration Success Email
export const sendRegistrationSuccessEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'jairosoft@gmail.com',
      to: userEmail,
      subject: '🎉 Welcome to Jairozon - Registration Successful!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <div style="padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px;">📚 Jairozon</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0;">Educational Excellence</p>
          </div>
          <div style="background: white; padding: 40px 30px;">
            <h2 style="color: #333; margin-bottom: 20px;">Welcome ${userName}! 🎉</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Congratulations! Your Jairozon account has been created successfully. You're now ready to explore our vast collection of educational books.</p>
            <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #667eea; margin-top: 0;">Get Started:</h3>
              <ul style="color: #666; line-height: 1.8;">
                <li>🔍 Browse our book categories</li>
                <li>🛒 Add books to your cart</li>
                <li>💳 Secure checkout process</li>
                <li>📦 Fast delivery to your doorstep</li>
              </ul>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/books" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin-right: 10px;">Start Shopping 🛒</a>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/profile" style="background: transparent; color: #667eea; padding: 15px 30px; text-decoration: none; border: 2px solid #667eea; border-radius: 25px; font-weight: bold; display: inline-block;">My Profile 👤</a>
            </div>
          </div>
          <div style="background: #333; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">© ${new Date().getFullYear()} Jairozon - Educational Books</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Registration success email sent');
  } catch (error) {
    console.error('Registration email error:', error);
  }
};

// Password Reset OTP Email
export const sendPasswordResetOTP = async (userEmail, userName, otp) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'jairosoft@gmail.com',
      to: userEmail,
      subject: '🔐 Password Reset OTP - Jairozon',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <div style="padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px;">🔐 Jairozon</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0;">Password Reset</p>
          </div>
          <div style="background: white; padding: 40px 30px;">
            <h2 style="color: #333; margin-bottom: 20px;">Hi ${userName}!</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">We received a request to reset your password. Use the OTP below to reset your password:</p>
            <div style="background: #f8f9ff; padding: 30px; border-radius: 8px; margin: 30px 0; text-align: center; border: 2px dashed #667eea;">
              <h1 style="color: #667eea; font-size: 36px; margin: 0; letter-spacing: 8px; font-family: monospace;">${otp}</h1>
              <p style="color: #999; margin: 10px 0 0 0; font-size: 14px;">This OTP expires in 10 minutes</p>
            </div>
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">⚠️ If you didn't request this password reset, please ignore this email or contact support.</p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Reset Password 🔑</a>
            </div>
          </div>
          <div style="background: #333; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">© ${new Date().getFullYear()} Jairozon - Educational Books</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset OTP email sent');
  } catch (error) {
    console.error('Password reset email error:', error);
  }
};