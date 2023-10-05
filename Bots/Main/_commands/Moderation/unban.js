const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const penalty =require("../../../../Global/Database/Ceza/ceza")
const bans = require("../../../../Global/Database/Ceza/ban");

class unBan extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            description: "ID'si girilen kullanıcının yasağını kaldırır.",
            usage: ".unban ID",
            category: "Moderasyon",
            aliases: ["unban","bankaldır"],

            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
 
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))){
        const hataEmbed =  new EmbedBuilder()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setColor("Red")
    const id = args[0];
    var reason = args.splice(1).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    if(!id) return  message.reply({embeds:[hataEmbed.setDescription(`**[ __Hata__ ]** \` | \` Yasağını kaldırmak istediğiniz kullanıcının ID'sini girmeniz gerekiyor.`)]}).then(async msg =>{
        setTimeout(async() => {
          if(msg && msg.deletable) await msg.delete();
          if(message && message.deletable) await message.delete();
        }, 10000);
      })
    if(!message.guild.bans.fetch(id)) return message.reply({embeds:[hataEmbed.setDescription(`**[ __Hata__ ]** \` | \` ID'si girilen kullanıcının yasağı bulunamadı.`)]}).then(async msg =>{
        setTimeout(async() => {
          if(msg && msg.deletable) await msg.delete();
          if(message && message.deletable) await message.delete();
        }, 10000);
      })
    if(message.guild.bans.fetch(id)) {
    const cezaId = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id,userID:id,  cezaId: cezaId+1}, {$set:{penaltys:{Staff:message.member.id, Punished:id, SentencingDate:Date.now(),Reason:reason, type:"UNBAN"}}},{upsert:true})
    await message.guild.members.unban(id, {reason:`Yasak ${message.member.user.tag} Tarafından Kaldırıldı!`})
    await message.reply({content:`${client.emojis.cache.find(x => x.name === "appEmoji_tik")} Ban Kaldırma İşlemi Başarılı! \n "${id}" ID'li kullanıcının yasağı <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) kaldırıldı!`})
     message.guild.channels.cache.get(Guild.BanLog)
    .send({embeds:[
        embed
        .setDescription(`<@${id}> (\`${id}\`), Mevcut yasaklandırması kaldırıldı!`)
        .addFields({name:`** **`,value:`\` ❯ \` **Yetkili:** ${message.member} [\`${message.member.user.tag} - ${message.member.id}\`]\n\` ❯ \`** Kullanıcı: **<@${id}> [\`${id}\`]\n\` ❯ \`** Tarih:** <t:${(Date.now() / 1000).toFixed()}> [<t:${(Date.now() / 1000).toFixed()}:R>]\n\` ❯ \`** Sebep:**\n\`\`\` ${reason} \`\`\``})]})
    await bans.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,unban:1},$push:{bans:{Punished:id, SentencingDate:Date.now(), Type:"UNBAN", Reason:reason }}},{upsert:true})
    }
} else {return message.reply({content:"Bu komutu kullanmak için gerekli yetkilere veya rollere sahip değilsin."})}
}
}
module.exports = unBan;