
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const penalty =require("../../../../Global/Database/Ceza/ceza")
const mute = require("../../../../Global/Database/Ceza/mute")

const ms = require("ms");
class ChatMute extends Command {
    constructor(client) {
        super(client, {
            name: "mute",
            description: "ID'si girilen kullanıcıyı süreli bir şekilde sunucunun metin kanallarında susturur",
            usage: ".mute @luhux/ID <süre> <sebep>",
            category: "Moderasyon",
            aliases: ["sustur","mute","cmute"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))){
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return cevap(message,"memberYok")
    if (member.user.bot) return cevap(message,"bot")
    if (!member.manageable) return cevap(message,"yetersizYetki")
    if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return cevap(message,"üstAynıYetki")
    var sure = args[1]
    if(!sure || !ms(sure)) return cevap(message,"sureYok")
    sure = ms(sure)
    let mutesure = args[1].replace(`s`, " Saniye").replace(`m`, " Dakika").replace(`h`, " Saat").replace(`d`, " Gün").replace(`w`, " Hafta")
    var reason = args.splice(2).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    const data = await penalty.find();
    let cezakontrol = data.filter(x=> x.penaltys.some(x=> x.type == "CHAT-MUTE" && x.Punished == member.id && x.Finished == false)).length > 0
    if(member.roles.cache.has(Guild.MuteRol) || cezakontrol) return message.reply({content:`**${member.user.tag}**, Aktif cezası bulunduğu için susturma işlemi yapılamaz.`})
    const ceza = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id, userID:member.id, cezaId: ceza+1}, {$set:{penaltys:{Staff:message.member.id, Punished:member.id, SentencingDate:Date.now(),PenaltyEndTime: Date.now()+sure,Finished:false,Reason:reason, type:"CHAT-MUTE"}}},{upsert:true})
    await member.roles.add(Guild.MuteRol)
    await message.reply({content:`Susturma (\`Chat Mute\`) İşlemi Başarılı! \n "${member.id}" ID'li kullanıcı <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) metin kanallarından susturuldu!`})
    if(Guild.MuteLog !=undefined && message.guild.channels.cache.get(Guild.MuteLog)) message.guild.channels.cache.get(Guild.MuteLog)
    .send({embeds:[embed.setTitle(`#${ceza+1} Numaralı Yeni Ceza`).setDescription(`${member} (\`${member.id}\`), Sunucunun metin kanallarından susturuldu!`).addFields({name:`#${ceza+1} Numaraları Cezanin Detayları;`,value:`\`[•]\` **Yetkili:** ${message.member} (\`${message.member.user.tag} ▬ ${message.member.id}\`)\n\`[•]\`** Kullanıcı:** ${member} (\`${member.id}\`)\n\`[•]\`** İşlem:** Metin Kanallarında Susturma (Chat Mute)\n\`[•]\`** Tarih:** <t:${(Date.now() / 1000).toFixed()}> (<t:${(Date.now() / 1000).toFixed()}:R>)\n\`[•]\`**  Sebep:** ${reason}\n\`[•]\` **Süre:** ${mutesure}`})]})
    await mute.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,mute:1},$push:{mutes:{Punished:member.id, SentencingDate:Date.now(), Type:"C-MUTE", Reason:reason,Finished:false}}},{upsert:true})
} else return cevap(message,"komutKullanamazsın")
}
}
module.exports = ChatMute;