const { PermissionsBitField,Formatters,ActionRowBuilder ,ButtonStyle,ButtonBuilder} = require('discord.js');
const { Command } = require("../../../../Global/Structures/Default.Commands");

class Avatar extends Command {
    constructor(client) {
        super(client, {
            name: "Avatar",
            description: "Kullanıcı avatar gösterir",
            usage: ".avatar",
            category: "Global",
            aliases: ["avatar","av","pp"],
            enabled: true,
            guildOwner:false,
            developer : false,
            cooldown: 3500,

        });
    }
    
   async onRequest (client, message, args,embed) {

const member = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) : message.author || message.member

let link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Tarayıcıda aç", style:ButtonStyle.Link, url: member.displayAvatarURL({dynamic:true})})]})
message.reply({content: `${member.displayAvatarURL({dynamic:true})}`, components:[link] })


}
   }

module.exports = Avatar
