const mongoose = require("mongoose");

const { Schema } = mongoose;

const Aboutus = new Schema(
  {title:String,body:String},{timestamps:true}
);

module.exports = mongoose.model("Aboutus", Aboutus);

