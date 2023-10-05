const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID: String,
  channelName:String,
  totalStat: { type: Number, default: 0 },

});

module.exports = model("luhux-message", schema);
