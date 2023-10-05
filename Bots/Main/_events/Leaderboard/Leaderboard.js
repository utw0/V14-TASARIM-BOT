const { Event } = require("../../../../Global/Structures/Default.Events");
const {Guild} = require("../../../../Global/Config/Guild")
const { CronJob } = require("cron");
const {Collection,EmbedBuilder} = require("discord.js")
const luhuxleader = require('../../../../Global/Database/Luhux/leaderboard');
const momen = require("moment")
require("moment-timezone")
require("moment-duration-format")
class Leaderboard extends Event {
    constructor(client) {
        super(client, {
            name: "ready",
            enabled: true,
        });    
    }    

 async   onLoad() {
const guild = client.guilds.cache.get(Guild.ID)
const embed =  new EmbedBuilder().setColor("2F3136").setAuthor({name: guild.name,iconURL: guild.iconURL()})
.setFooter({text: "Developed By Luhux", iconURL: guild.members.cache.get(client.owners[0]).user.avatarURL({dynamic:true})})
new CronJob("00 00 * * *", async () => {
    const data = await luhuxleader.findOne({ guildID: guild.id });
    const only = data ? data.only : false;
    if (only == true) {
      const luhuxveri = require('../../../../Global/Database/Luhux/veriler');
      const kanal = await guild.channels.cache.get(data.channelID);
      const topLikedPosts = await luhuxveri.find({}).sort({ like: -1 }).limit(1);
  
      if (topLikedPosts.length > 0) {
        const mostLikedPost = topLikedPosts[0];
        embed.setImage(`${mostLikedPost.imageLinks}`); 
  
        const gönderiler = await kanal.messages.fetch(data.MessageBoardID);
        if (gönderiler) {
          gönderiler.edit({ embeds: [embed] });
        }
      }
    }
  }, null, true, "Europe/Istanbul").start();
} }
  
module.exports = Leaderboard;
