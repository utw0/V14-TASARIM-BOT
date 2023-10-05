
const { Command } = require("../../../../Global/Structures/Default.Commands");
const canvafy = require('canvafy')
class Ship extends Command {
    constructor(client) {
        super(client, {
            name: "Ship",
            description: "Ship",
            usage: ".Ship",
            category: "Global",
            aliases: ["Ship","SHİP","ship"],

            enabled: true,
 
            });
    }
async onRequest (client, message, args, embed) {
 
let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.random();
if(!user) return message.channel.send({ embeds: [embed.setDescription(`> **Geçerli Bir User Belirt!**`)] })
const ship = await new canvafy.Ship()
.setAvatars(message.author.displayAvatarURL({ dynamic: true, extension: "png" }),user.user.displayAvatarURL({ dynamic: true, extension: "png" }))
.setBackground("image", `${message.guild.bannerURL({extension:"png",size:2048}) !== null ? message.guild.bannerURL({extension:"png",size:2048}) : "https://media.discordapp.net/attachments/1087030211813593190/1105791147441410129/4zh2hgl46cp51.png?width=1440&height=450"}`)
.setBorder("#f0f0f0")
.setOverlayOpacity(0.5)
.build();


message.reply({
  content:`> **     ${message.author.tag} ❓ ${user.user.tag}**`,
  files: [{
    attachment: ship.toBuffer(),
    name: `ship-${message.member.id}.png`
  }]
});
        }
    }

    module.exports = Ship;