const mongoose = require("mongoose");

const { Schema } = mongoose;
// const shortid = require("shortid");

const NoteSchema = new Schema({
  title: { type: String, default: "Untitled" },
  rawContent: { type: Object },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

NoteSchema.pre("save", next => {
  this.updated_at = Date.now()
  next()
})

module.exports = mongoose.model("NoteSchema", NoteSchema);
