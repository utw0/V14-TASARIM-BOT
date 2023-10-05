const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
class Banliste extends Command {
    constructor(client) {
        super(client, {
            name: "Ban",
            description: "Sunucudaki yasaklı kişileri gösterir.",
            usage: ".ban @luhux/ID",
            category: "Moderasyon",
            aliases: ["ban-list","banlist","yasaklılar"],
            enabled: true,
        });
    }
async onRequest (client, message, args, embed) {

if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))) {
    var luhuxoclarıbanla = 0;
await  message.guild.bans.fetch().then(async (banned)=> luhuxoclarıbanla = banned.size);
var bannedUsers = [];
await message.guild.bans.fetch().then(async (banned) => {
var i = 0;
    banned.forEach(async (user) => {
        i = i+1
       bannedUsers.push(`${i}. ${user.user.tag} (${user.user.id})`)
   })
})
let luhuxx = await chunkify(bannedUsers,20)
message.channel.send({content:`Sunucuda Toplam ${luhuxoclarıbanla} Adet Yasaklama Bulunuyor.`}).then(a=>{
luhuxx.forEach(x=>message.channel.send({content:` \`\`\`md
${x.join("\n")}
\`\`\``}))
})
} else {return message.reply({content:"Bu komutu kullanmak için gerekli yetkilere veya rollere sahip değilsin."})}
}
}
module.exports = Banliste;