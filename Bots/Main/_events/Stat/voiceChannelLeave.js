const { Event } = require("../../../../Global/Structures/Default.Events");
const voiceJoinedAt = require('../../../../Global/Database/Voice/voiceJoinedAt');
const voiceUser = require('../../../../Global/Database/Voice/VoiceUsers');
const voiceGuild = require('../../../../Global/Database/Voice/voiceGuild');
const voiceGuildChannel = require('../../../../Global/Database/Voice/voiceGuildChannel');
const voiceUserChannel = require('../../../../Global/Database/Voice/voiceUserChannel');
class voiceChannelLeave extends Event {
    constructor(client) {
        super(client, {
            name: "voiceChannelLeave",
            enabled: true,
        });
    }
    
 async onLoad(member, channel) {
  
       
          if ((member && member.user.bot) || (member && member.user.bot)) return;
          var joinedAtData = await voiceJoinedAt.findOne({ userID: member.id });
          if (!joinedAtData){
          await voiceJoinedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });
          joinedAtData = await voiceJoinedAt.findOne({ userID: member.id });
        }
        const data = Date.now() - joinedAtData.date;
        await voiceUser.findOneAndUpdate({ guildID: channel.guild.id, userID: member.id }, { $inc: {totalStat:data} }, { upsert: true });
        await voiceGuild.findOneAndUpdate({ guildID: channel.guild.id }, { $inc: {totalStat:data } }, { upsert: true });
        await voiceGuildChannel.findOneAndUpdate({ guildID: channel.guild.id}, { $inc: { channelData: data } }, { upsert: true });
        await voiceUserChannel.findOneAndUpdate({ guildID: channel.guild.id, userID: member.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
        if (channel.parentId) await voiceUserParent.findOneAndUpdate({ guildID: channel.guild.id, userID: member.id, parentID: channel.parentId }, { $inc: { parentData: data } }, { upsert: true });
        await voiceJoinedAt.findOneAndDelete({ userID: member.id }, { upsert: true });
    
        

    }
}

module.exports = voiceChannelLeave
