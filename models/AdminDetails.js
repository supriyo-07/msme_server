const mongoose = require('mongoose');

const adminDetailSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AdminDetail = mongoose.model('AdminDetail', adminDetailSchema, 'admin_details');

module.exports = AdminDetail;
