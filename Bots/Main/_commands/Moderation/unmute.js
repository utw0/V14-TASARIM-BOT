const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const penalty =require("../../../../Global/Database/Ceza/ceza")
const mute = require("../../../../Global/Database/Ceza/mute")
const ms = require("ms");
class ChatUnMute extends Command {
    constructor(client) {
        super(client, {
            name: "C-unmute",
            description: "ID'si girilen kullanıcının metin kanallarındaki susturmasını açar.",
            usage: ".cmute @luhux/ID <süre> <sebep>",
            category: "Moderasyon",
            aliases: ["susturmaac","unmute","cunmute"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))){
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return  cevap(message,"memberYok")
    if (member.user.bot) return cevap(message,"bot")
    if (!member.manageable) return cevap(message,"yetersizYetki")
    if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return cevap(message,"üstAynıYetki")
    var reason = args.splice(2).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    const data = await penalty.find();
    let cezakontrol = await data.filter(x=> x.penaltys.some(x=> x.type == "CHAT-MUTE" && x.Punished == member.id && x.Finished == false)).length < 0
    if(!member.roles.cache.has(Guild.MuteRol) || cezakontrol) return message.reply({content:`**${member.user.tag}**, Aktif cezası bulunmadığı için bu işlem yapılamaz`})
    const ceza = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:message.member.id, Punished:member.id, SentencingDate:Date.now(),Reason:reason, type:"CHAT-UNMUTE"}}},{upsert:true})
    
    await message.reply({content:`${client.emojis.cache.find(x => x.name === "appEmoji_tik")} Susturma Açma (\`Chat UnMute\`) İşlemi Başarılı! \n "${member.id}" ID'li kullanıcı <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) metin kanallarında ki susturması açıldı!`})
    message.guild.channels.cache.get(Guild.MuteLog)
    .send({embeds:[embed.setDescription(`${member} [\`${member.id}\`], Sunucunun metin kanallarında bulunan susturması açıldı!`).addFields({name:`** **`,value:`\` ❯ \` **Yetkili:** ${message.member} [\`${message.member.user.tag} - ${message.member.id}\`]\n\` ❯ \`** Kullanıcı:** ${member} [\`${member.id}\`]\n\` ❯ \`** Tarih:** <t:${(Date.now() / 1000).toFixed()}> [<t:${(Date.now() / 1000).toFixed()}:R>]\n\` ❯ \`**  Sebep:**\n\`\`\` ${reason} \`\`\``})]})
    await mute.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,unmute:1},$push:{mutes:{Punished:member.id, SentencingDate:Date.now(), Type:"C-UNMUTE", Reason:reason,Finished:false}}},{upsert:true})
    await cezaç(message.guild,member,message.member)

} else {return message.reply({content:"Bu komutu kullanmak için gerekli yetkilere veya rollere sahip değilsin."})}
}
}
async function cezaç(guild,member,staff){
    await penalty.find({guildID:guild.id}, async (err,data) => {
        data.filter(x=> x.penaltys.some(x=>x.type == "CHAT-MUTE" && x.Finished == false)).forEach(async veri => {
            veri.penaltys.forEach(async ceza => {
                if(member.roles.cache.has(Guild.MuteRol)) member.roles.remove(Guild.MuteRol)
                await penalty.findOneAndUpdate({guildID:guild.id,cezaId:veri.cezaId},{$set:{penaltys:{Staff:ceza.Staff, Punished:ceza.Punished,SentencingDate:ceza.SentencingDate,PenaltyEndTime:ceza.PenaltyEndTime,Finished:true,type:ceza.type}}},{upsert:true})
            })
       
        })
        if(Guild.MuteLog !=undefined && message.guild.channels.cache.get(Guild.MuteLog)) message.guild.channels.cache.get(Guild.MuteLog)
        .send({content:`${member} Ses kanallarındaki susturması ${staff} tarafından <t:${(Date.now() / 1000).toFixed()}:R> kaldırıldı.`})
       
        })
}
module.exports = ChatUnMute;