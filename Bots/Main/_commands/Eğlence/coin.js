const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const Coin = require("../../../../Global/Database/Coin/Coin")

class coin extends Command {
    constructor(client) {
        super(client, {
            name: "coin",
            description: "hm",
            usage: ".coin (@luhux/ID)",
            category: "Economy",
            aliases: ["coin","param"],
            enabled: true,
        });
    }
 async onRequest (client, message, args,embed) {
    const member = message.member
    const coin = message.guild.emojis.cache.find(x=> x.name == "appEmoji_coin");
    var data = await Coin.findOne({guildID:message.guild.id,userID:member.id})
    if(!data) await Coin.findOneAndUpdate({guildID:message.guild.id,userID:member.id},{$set:{coin:100,beklemeSuresi:Date.now(),gameSize:0,dailyCoinDate:(Date.now() - 86400000)}},{upsert:true})
    data = await Coin.findOne({guildID:message.guild.id,userID:member.id})
    message.reply({content:`**Şuanda __${data.coin}__ ${coin} Coin'in bulunuyor. **`})

}
}
module.exports = coin;