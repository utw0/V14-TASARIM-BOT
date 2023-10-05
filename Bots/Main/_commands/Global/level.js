const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const levels = require("../../../../Global/Database/Message/LevelSystem")
const canvafy = require("canvafy");
class level extends Command {
    constructor(client) {
        super(client, {
            name: "level",
            description: "Sunucuda olan leveliniz",
            usage: ".level @Luppux/ID",
            category: "İstatistik",
            aliases: ["lvl","xp","Level","lv","LEVEL"],
            enabled: true,
});
    }
 async onRequest (client, message, args,embed) {
      const member =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      const x = await levels.findOne({ guildID: message.guild.id, userID: member.user.id })
      let status;

      if(member.presence && member.presence.status === "dnd") status = "#ff0000"
      if(member.presence && member.presence.status === "idle") status = "#ffff00"
      if(member.presence && member.presence.status === "online") status = "#00ff00"
      if(member.presence && member.presence.status === "offline") status = "#808080"

      const rank = await new canvafy.Rank()
      .setAvatar(message.author.displayAvatarURL({ forceStatic: true, extension: "png" }))
      .setBackground("image", "https://cdn.discordapp.com/attachments/1077179848985956422/1096530003866431559/1111111.png")
      .setUsername(member.displayName ? member.displayName : member.user.tag)
      .setDiscriminator(member.user.discriminator)
      .setStatus(member.presence ? message.member.presence.status : `online`)
      .setLevel(x ? x.level : 1)
      .setRank(x ? x.level : 1)
      .setCurrentXp(x ? x.xp : 1)
      .setRequiredXp(x ? x.gerekli: 100)
      .build();
  
      message.reply({
        files: [{
          attachment: rank.toBuffer(),
          name: `rank-${message.member.id}.png`
        }]
      });

    }
    }
    
    
    
   
    module.exports = level;