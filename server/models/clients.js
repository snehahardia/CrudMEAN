const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  clientName    : { type: String },
  clientPhoneNo : { type: Number },
  clientEmail   : { type: String },
  clientAddress : { type: String }
});

module.exports = mongoose.model('client', clientSchema, 'clients');