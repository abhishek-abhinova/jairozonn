import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: ''
  },
  emailNotifications: {
    orderUpdates: { type: Boolean, default: true },
    newArrivals: { type: Boolean, default: true },
    promotions: { type: Boolean, default: false }
  },
  cartItems: { type: Object, default: {} },
},
  { minimize: false, timestamps: true }
);



const User = mongoose.model('User', userSchema);
export default User;
