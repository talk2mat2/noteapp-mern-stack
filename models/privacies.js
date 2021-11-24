const mongoose = require("mongoose");

const { Schema } = mongoose;

const Privacies = new Schema(
  
  {title:String,body:String},{timestamps:true}
  
);

module.exports = mongoose.model("Privacies", Privacies);

