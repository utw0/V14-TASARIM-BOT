const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const penalty =require("../../../../Global/Database/Ceza/ceza")
const bans = require("../../../../Global/Database/Ceza/ban")
class Ban extends Command {
    constructor(client) {
        super(client, {
            name: "Ban",
            description: "ID'si girilen kullanıcıyı sunucudan yasaklar.",
            usage: ".ban @luhux/ID",
            category: "Moderasyon",
            aliases: ["yasakla","ban","sik","uçur","ucur","luhuxsikgeçortalığı"],
            enabled: true,
        });
    }
async onRequest (client, message, args, embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return cevap(message,"memberYok")
    if (member.user.bot) return cevap(message,"bot")
    if (!member.manageable) return cevap(message,"yetersizYetki")
    if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return cevap(message,"üstAynıYetki")
    var reason = args.splice(1).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    const ceza = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:message.member.id, Punished:member.id, SentencingDate:Date.now(),Reason:reason, type:"BAN"}}},{upsert:true})
    await message.guild.members.ban(member.id, {reason:`${message.member.user.tag} Tarafından Yasaklandı!`})
    await message.reply({ embeds: [new EmbedBuilder().setColor("2F3136").setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.avatarURL({dynamic:true})
    }).setDescription(`${member} Kullanıcısı banlandı. \n "${member.id}" ID'li kullanıcı <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) sunucudan yasaklandı!`).setImage("https://cdn.discordapp.com/attachments/1066294817878986782/1067039590818529290/00648c6786aedeaf2d9b401e17dc7fe7.gif")]})
    message.guild.channels.cache.get(Guild.BanLog)
    .send({embeds:[embed.setDescription(`${member} [\`${member.id}\`], Sunucudan Yasaklandı!`).addFields({name:`** **`,value:`\` ❯ \` **Yetkili:** ${message.member} [\`${message.member.user.tag} - ${message.member.id}\`]\n\` ❯ \`** Kullanıcı:** ${member} [\`${member.id}\`]\n\` ❯ \`** Tarih:** <t:${(Date.now() / 1000).toFixed()}> [<t:${(Date.now() / 1000).toFixed()}:R>]\n\` ❯ \`**  Sebep:**\n \`\`\` ${reason} \`\`\``})]})
    await bans.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,banned:1},$push:{bans:{Punished:member.id, SentencingDate:Date.now(), Type:"BAN", Reason:reason}}},{upsert:true})
} else {return message.reply({content:"Bu komutu kullanmak için gerekli yetkilere veya rollere sahip değilsin."})}
}
}
module.exports = Ban;