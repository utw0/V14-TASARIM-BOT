const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")

class Url extends Command {
    constructor(client) {
        super(client, {
            name: "Url",
            description: "Sunucu Özel Url.",
            usage: ".url",
            category: "Moderasyon",
            aliases: ["url","özelurl","Url"],
            enabled: true,
        });
    }
async onRequest (client, message, args, embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))) { 
if(!message.guild.vanityURLCode) return message.reply({ content:"Sunucuda bir özel url yok"});
const url = await message.guild.fetchVanityData();
message.reply({ content: `discord.gg/${message.guild.vanityURLCode}\n\`Toplam kullanım:\` **${url.uses}**`})
    } else return cevap(message,"komutKullanamazsın")
}}
module.exports = Url;