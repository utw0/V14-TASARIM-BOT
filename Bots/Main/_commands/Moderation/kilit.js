
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, PermissionOverwrites  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
class Kilit extends Command {
    constructor(client) {
        super(client, {
            name: "Kilit",
            description: "Komutu kullandığınız kanalı yazmaya kapatır.",
            usage: ".kilit",
            category: "Management",
            aliases: ["kilit","lock"],

            enabled: true,

            });
    }
 async onRequest (client, message, args,embed) {
  if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))){
  let everyone = await message.guild.roles.everyone
  let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

  if (channel.permissionsFor(everyone).has(PermissionsBitField.Flags.SendMessages)) {
    await channel.permissionOverwrites.edit(everyone, {SendMessages: false,});
    if(message) await message.react(await emojiBul("appEmoji_tik"))

      await message.reply({ content: `<t:${(Date.now()/1000).toFixed()}:R> bu kanal yazmaya kapatıldı!`}).then(async msg =>{setTimeout(async() => {if(msg) await msg.delete();if(message) await message.delete();}, 10000);})
    
  } else {
    if(message) await message.react(await emojiBul("appEmoji_tik"))

    await channel.permissionOverwrites.edit(everyone, {SendMessages: true,});
     await message.reply({ content: `<t:${(Date.now()/1000).toFixed()}:R> bu kanal yazmaya açıldı!`}).then(async msg =>{setTimeout(async() => {if(msg) await msg.delete();if(message) await message.delete();}, 10000);})


  } 
}else return cevap(message,"komutKullanamazsın")
}
}
module.exports = Kilit;