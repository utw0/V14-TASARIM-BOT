const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const voiceJoinedAt = require('../../../../Global/Database/Voice/voiceJoinedAt');
class voiceChannelJoin extends Event {
    constructor(client) {
        super(client, {
            name: "voiceChannelJoin",
            enabled: true,
        });
    }
    
 async onLoad(member, channel) {
      if ((member && member.user.bot) || (member && member.user.bot)) return;
      await voiceJoinedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });
    }
}

module.exports = voiceChannelJoin
