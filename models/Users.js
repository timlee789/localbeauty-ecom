import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // Product: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Product',
  // },

  //_id: {type:String, required: true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tel: { type: String, required: true},
  password: { type: String, required: true },
 
  storename: { type: String },
  url: { type: String },
  address: {type: String, required: true},
  city: { type: String },
  state: { type: String },
  img1: { type: String },
  banner: {type: String},
  zip: { type: String },
  
  isAdmin: { type: Boolean, default: true },
 
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
