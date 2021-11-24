const mongoose = require("mongoose");

const { Schema } = mongoose;
// const shortid = require("shortid");

const Plans = new Schema({
  premium: { type: Number },
  business: { type: Number },

},{timestamps:true});



module.exports = mongoose.model("Plans", Plans);
