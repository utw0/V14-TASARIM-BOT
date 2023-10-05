
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const luhuxveri = require('../../../../Global/Database/Luhux/veriler');
const luhuxleader = require('../../../../Global/Database/Luhux/leaderboard');
class Hafta extends Command {
    constructor(client) {
        super(client, {
            name: "topgönderi",
            description: "manuel kod denemeleri için",
            usage: ".topgönderi",
            category: "Luhux",
            aliases: ["topgönderi","luhuxbab","luhuxceren"],

            enabled: true,
            developer : true

        });
    }
    

    onLoad(client) {
    
    }

   async onRequest (client, message, args) {
    if (args[0] === "kur") {
        const kanal = message.guild.channels.cache.get(args[1]);
        const topLikedPosts = await luhuxveri.find({}).sort({ like: -1 }).limit(3);
      
        if (topLikedPosts.length === 0) {
          message.channel.send('Henüz hiç gönderi yok veya hiç like alınmamış.');
          return;
        }
      
        topLikedPosts.forEach(async (post, index) => {
          const user = client.users.cache.get(post.userID);
      
          if (!user) return;
      
          const embed = new EmbedBuilder()
            .setTitle(`En Çok Beğenilen Gönderi **${index + 1}.**`)
            .setDescription(`Kullanıcı: <@${user.id}>\nLike Sayısı: \`${post.like}\`\nGönderi Tarihi: <t:${(post.date / 1000).toFixed()}:f>`)
            .setColor('#00ff00');
      
          post.imageLinks.forEach((imageLink) => {
            embed.setImage(imageLink);
          });
      
          const sentMessage = await kanal.send({ embeds: [embed] });
    
          await luhuxleader.findOneAndUpdate(
            { guildID: message.guild.id }, 
            { MessageBoardID: sentMessage.id }, 
            { new: true, upsert: true } 
          );
        });
      }
}
}
module.exports = Hafta;

