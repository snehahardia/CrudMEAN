const mongoose = require('mongoose');
const Client = require('../models/clients');
const Car = require('../models/cars');
const Driver = require('../models/drivers');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  clientName  : { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
  bookingDate : { type: Date },
  fromCity    : { type: String },
  toCity      : { type: String },
  pickupDate  : { type: Date },
  returnDate  : { type: Date },
  car         : { type: mongoose.Schema.Types.ObjectId, ref: 'car' },
  driver      : { type: mongoose.Schema.Types.ObjectId, ref: 'driver' }
});

module.exports = mongoose.model('booking', bookingSchema, 'bookings');