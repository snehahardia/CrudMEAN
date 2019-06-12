const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name     : { type: String },
  email    : { type: String, required: true, unique: true },
  password : { type: String, required: true },
  address  : { type: String },
  phoneNo  : { type: Number },
  role     : { type: String, default: 'user'}
});

module.exports = mongoose.model('user', userSchema, 'users');