
const { Command } = require("../../../../Global/Structures/Default.Commands");
class Cihaz extends Command {
    constructor(client) {
        super(client, {
            name: "Cihaz",
            description: "Cihaz",
            usage: ".Cihaz",
            category: "Global",
            aliases: ["Cihaz","cihaz","cıhaz"],

            enabled: true,
 
            });
    }
async onRequest (client, message, args,embed) {
 
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let clientStatus = member.presence.clientStatus;
    message.channel.send({embeds: [embed.setDescription(`${member} üyesinin şu anki cihazları;\n\n${Object.keys(member.presence.clientStatus).map(c => `\`•\` ${c.replace("desktop", "Masaüstü Uygulaması").replace("mobile", "Mobil Cihaz").replace("web", "İnternet Tarayıcısı")} (${clientStatus[c].replace("online", "Çevrim içi").replace("dnd", "Rahatsız etmeyin").replace("idle", "Boşta")})`).join("\n")}`)]});

            
        }
    }

    module.exports = Cihaz;