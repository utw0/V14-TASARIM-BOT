const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  channelID:{type:String},
  only:{type:Boolean},
  MessageBoardID:{type:String},
});

module.exports = model("luhux*leaderBoard", schema);
