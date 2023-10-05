
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");

class Emoji extends Command {
    constructor(client) {
        super(client, {
            name: "emoji",
            description: "manuel kod denemeleri için",
            usage: ".emojiekle",
            category: "Luhux",
            aliases: ["emekle","emoji","emojiekle"],

            enabled: true,


        });
    }
    

    onLoad(client) {
    
    }

   async onRequest (client, msg, args,embed) {
    if(!msg.member.permissions.has(PermissionsBitField.Flags.Administrator)) return msg.react(await emojiBul("appEmoji_carpi"))
     const hasEmoteRegex = /<a?:.+:\d+>/gm
    const emoteRegex = /<:.+:(\d+)>/gm
    const animatedEmoteRegex = /<a:.+:(\d+)>/gm
    const isim = `luhux_${Math.round((Math.random()*9999))}`
    const message = msg.content.match(hasEmoteRegex)
    var emoji;
      if (emoji = emoteRegex.exec(message)) return EmojiYükle("https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1", isim, msg)
      else 
      if (emoji = animatedEmoteRegex.exec(message)) return EmojiYükle("https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1", isim, msg)
      else {
        let [link, ad] = args.slice(0).join(" ").split(" ");
        if (!link) return msg.channel.send(`Lütfen bir bağlantı belirtmelisin! __Örn:__ \`.emojiekle <Bağlantı> <Emoji Ismi>\``).then(x => setTimeout(() => { x.delete() }, 7500));
        if (!ad) return msg.channel.send(`Lütfen bir emoji ismi belirtmelisin! __Örn:__ \`.emojiekle <Bağlantı> <Emoji Ismi>\``).then(x => setTimeout(() => { x.delete() }, 7500));
        EmojiYükle(link, ad, msg)
      
 }
    }
}
function EmojiYükle(link, ad, message) {
  message.guild.emojis.create({attachment:link,name: ad})
  .then(emoji => message.channel.send({embeds: [new EmbedBuilder().setDescription(`Başarıyla \`${emoji.name}\` adında emoji oluşturuldu. (${emoji})`)]}).then(x => {
    message.react("✔")  
    setTimeout(() => {
          x.delete()

      }, 7500);
  }))
}
module.exports = Emoji;
