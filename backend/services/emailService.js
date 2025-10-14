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