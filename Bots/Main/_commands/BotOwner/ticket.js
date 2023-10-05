const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
class Ticket extends Command {
    constructor(client) {
        super(client, {
            name: "Ticket",
            description: "Bot ile mesaj göndermek için",
            usage: ".Ticket (metin/embed)",
            category: "luhux",
            aliases: ["Ticket","ticket"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
    

    onLoad(client) {
    
    }

 async onRequest (client, message, args,embed) {
    message.channel.send({
        embeds: [{
            title: "Ticket Aç",
            description: `Lütfen açmak istediğiniz ticket türünü seçin.`,
            footer: {
                text: "Ticket Destek"
            },
           
        }],
        components: [
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('staff').setLabel('Destek').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('answer').setLabel('Sipariş').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('other').setLabel('Diğer Konular').setStyle(ButtonStyle.Success)
            )
        ]
    })
}
}
module.exports = Ticket;