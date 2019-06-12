const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const driverSchema = new Schema({
  driverName    : { type: String },
  driverPhoneNo : { type: Number },
  driverAddress : { type: String }
});

module.exports = mongoose.model('driver', driverSchema, 'drivers');