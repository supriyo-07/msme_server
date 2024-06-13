const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  gender: String,
  whno: String,
  contact: String,
  email: String,
  dob: String,
  businessName: String,
  category: String,
  address: String,
  pin: String,
  loc: String,
  city: String,
  link: String,
  desc: String,
  disc: { type: Number, default: 0 },
  logo: String,
  status: { type: String, default: 'not verified' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FormData', formSchema);
