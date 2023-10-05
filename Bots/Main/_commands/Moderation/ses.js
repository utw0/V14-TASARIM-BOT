const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
class Nerde extends Command {
    constructor(client) {
        super(client, {
            name: "Nerde",
            description: "ID'si girilen ceza bilgilerini gösterir.",
            usage: ".Nerde (@luhux/ID)",
            category: "Moderasyon",
            aliases: ["nerde","n","ses","sesbilgi"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))){
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member.voice.channel)
        return message.reply({ embeds: [ new EmbedBuilder() 
            .setAuthor({ name: message.author.tag,iconURL: message.author.displayAvatarURL({ dynamic: true})})
            .setDescription(`${member} bir ses kanalına bağlı değil.`,)]});
    let mic = member.voice.selfMute == true ? "Kapalı ❌" : "Açık ✅"
    let hop = member.voice.selfDeaf == true ? "Kapalı ❌" : "Açık ✅"
    const embed = new EmbedBuilder()
        .setAuthor({     name: message.author.tag,  iconURL: message.author.displayAvatarURL({ dynamic: true }), })
        .setColor("Random").setDescription(` 
${member} Kullanıcısı ${member.voice.channel} ses kanalında
Mikrafonu; \`${mic}\`
Kulaklığı; \`${hop}\``);
    message.reply({ embeds: [embed] });

    }}}
module.exports = Nerde;