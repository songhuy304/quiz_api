const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:  String,
    price: Number,
    des:String
  });

 const product = mongoose.model('product', productSchema);
module.exports = product;
