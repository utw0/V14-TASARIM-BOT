const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  channelID: String,
  totalStat: { type: Number, default: 0 },

});

module.exports = model("voiceGuild", schema);
