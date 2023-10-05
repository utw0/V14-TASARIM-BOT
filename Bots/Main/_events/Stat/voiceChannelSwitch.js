const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');
const voiceJoinedAt = require('../../../../Global/Database/Voice/voiceJoinedAt');
const voiceUser = require('../../../../Global/Database/Voice/VoiceUsers');
const voiceGuild = require('../../../../Global/Database/Voice/voiceGuild');
const voiceGuildChannel = require('../../../../Global/Database/Voice/voiceGuildChannel');
const voiceUserChannel = require('../../../../Global/Database/Voice/voiceUserChannel');
class voiceChannelSwitch extends Event {
    constructor(client) {
        super(client, {
            name: "voiceChannelSwitch",
            enabled: true,
        });
    }
    
 async onLoad(member, oldChannel, newChannel) {
   
            
              if ((member && member.user.bot) || (member && member.user.bot)) return;
              var joinedAtData = await voiceJoinedAt.findOne({ userID: member.id });
              if (!joinedAtData){
              await voiceJoinedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });
              joinedAtData = await voiceJoinedAt.findOne({ userID: member.id });
            }
            const data = Date.now() - joinedAtData.date;
                    await voiceUser.findOneAndUpdate({ guildID: oldChannel.guild.id, userID: member.id }, { $inc: {totalStat:data} }, { upsert: true });
                    await voiceGuild.findOneAndUpdate({ guildID: oldChannel.guild.id }, { $inc: { totalStat:data } }, { upsert: true });
                    await voiceGuildChannel.findOneAndUpdate({ guildID: oldChannel.guild.id}, { $inc: { channelData: data } }, { upsert: true });
                    await voiceUserChannel.findOneAndUpdate({ guildID: oldChannel.guild.id, userID: member.id, channelID: oldChannel.id }, { $inc: { channelData: data } }, { upsert: true });
                    if (oldChannel.parentId) await voiceUserParent.findOneAndUpdate({ guildID: oldChannel.guild.id, userID: member.id, parentID: oldChannel.parentId }, { $inc: { parentData: data } }, { upsert: true });
                    await voiceJoinedAt.findOneAndDelete({ userID: user.id });    
            
    }
}

module.exports = voiceChannelSwitch
