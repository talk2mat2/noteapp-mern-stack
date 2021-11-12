const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const shortid = require("shortid");

const UserSchema = new Schema({
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  plans: { type: String, default: "Basic" ,enum:['Basic','Premium','Business']},
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  purchase_date:Date,
  expire_date:Date,
  payment_response:Object
});

UserSchema.methods.verifyPassword = async function (Password) {
  const match = await bcrypt.compare(Password, this.Password);

  if (match) {
    return true;
  } else {
    return false;
  }
};
UserSchema.pre("save", next => {
  this.updated_at = Date.now()
  next()
})
module.exports = mongoose.model("Users", UserSchema);
