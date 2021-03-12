const mongoose = require("mongoose");

const { Schema } = mongoose;
// const shortid = require("shortid");

const NoteSchema = new Schema({
  title: { type: String, default: "Untitled" },
  rawContent: { type: Object },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

module.exports = mongoose.model("NoteSchema", NoteSchema);
