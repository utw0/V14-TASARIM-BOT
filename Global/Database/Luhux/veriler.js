const { Schema, model } = require("mongoose");
const schema = Schema({
  guildID: String,
  userID: String,
  channelID: String,
  content: String,
  like:Number,
  dislike:Number,
  date: { type: Number, default: Date.now() },
  likes: [String],
  dislikes: [String],
  imageLinks: [String], 
});

module.exports = model("luhux-veriler", schema);
