const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
  carName : { type: String },
  carNo   : { type: Number }
});

module.exports = mongoose.model('car', carSchema, 'cars');