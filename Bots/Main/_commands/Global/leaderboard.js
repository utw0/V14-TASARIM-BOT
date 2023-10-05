
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const luhuxveri = require('../../../../Global/Database/Luhux/veriler');
class Leaderboard extends Command {
    constructor(client) {
        super(client, {
            name: "toplike",
            description: "top like",
            usage: ".toplike ",
            category: "Global",
            aliases: ["top-beğeni","top-like"],

            enabled: true,

        });
    }
    

    onLoad(client) {
    
    }

 async onRequest (client, message, args) {

  let Row = new ActionRowBuilder().addComponents(


    new ButtonBuilder()
    .setLabel("En Çok Like Alan Kullanıcılar")
    .setCustomId("test2")
    .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
    .setLabel("En Çok Like Alan Paylaşımlar")
    .setCustomId("test")
    .setStyle(ButtonStyle.Secondary),


)
const top10LikedUsers = await luhuxveri.aggregate([
  {
    $group: {
      _id: "$userID",
      maxLike: { $max: "$like" },
    },
  },
  {
    $sort: { maxLike: -1 },
  },
  {
    $limit: 10,
  },
]);

if (top10LikedUsers.length > 0) {
  const embed = new EmbedBuilder()
    .setColor("#0000FF")
    .setTitle("En çok beğeni alan kullanıcılar:")
    .setDescription("Aşağıda en çok beğeni alan kullanıcılar listeleniyor:");

  top10LikedUsers.forEach(async (user, index) => {
    const member = message.guild.members.cache.get(user._id);
    if (!member) return;

    const userDisplayName = member.displayName || "Bilinmeyen Kullanıcı";
    const likeCount = user.maxLike || 0;

    embed.addFields({ name: `#${index + 1} - ${userDisplayName}`, value: `\`Like Sayısı: ${likeCount}\``, inline: true });
  });
message.channel.send({ embeds: [embed] ,components:[Row]})


.then(async (msg) => {

  var filter = (i) => i.user.id == message.member.id
  let collector = msg.createMessageComponentCollector({filter: filter})
  collector.on('collect', async (i) => {
      if(i.customId == "test") {
        const top10LikedPosts = await luhuxveri.aggregate([
          {
            $match: {
              like: { $gt: 0 },
            },
          },
          {
            $sort: { like: -1 },
          },
          {
            $limit: 10,
          },
        ]);
      
      if (top10LikedPosts.length > 0) {
        const embed = new EmbedBuilder()
          .setColor("#0000FF")
          .setTitle("En çok beğeni alan gönderiler:")
          .setDescription("Aşağıda en çok beğeni alan gönderiler listeleniyor:");
      
        top10LikedPosts.forEach((postData, index) => {
          const member = message.guild.members.cache.get(postData.userID);
          const userDisplayName = member ? member.displayName : "Bilinmeyen Kullanıcı";
          const likeCount = postData.like || 0;
          const dislikeCount = postData.dislike || 0;
          const content = postData.imageLinks || "Gönderi içeriği yok";
          embed.addFields({ name: `#${index + 1} - ${userDisplayName}`, value: `\`Like Sayısı: ${likeCount} - Dislike Sayısı: ${dislikeCount}\`\nGönderi İçeriği: [Bağlantı](${content})`, inline: true });
        });
      msg.edit({embeds:[embed]})
      i.reply({content:""})
      }
    }
    if(i.customId == "test2") {
      const top10LikedUsers = await luhuxveri.aggregate([
        {
          $group: {
            _id: "$userID",
            maxLike: { $max: "$like" },
          },
        },
        {
          $match: {
            maxLike: { $ne: 0 }, // Beğeni sayısı 0'dan farklı olanları seç
          },
        },
        {
          $sort: { maxLike: -1 },
        },
        {
          $limit: 10,
        },
      ]);
      
      if (top10LikedUsers.length > 0) {
        const embed = new EmbedBuilder()
          .setColor("#0000FF")
          .setTitle("En çok beğeni alan kullanıcılar:")
          .setDescription("Aşağıda en çok beğeni alan kullanıcılar listeleniyor:");
      
        top10LikedUsers.forEach(async (user, index) => {
          const member = message.guild.members.cache.get(user._id);
          if (!member) return;
      
          const userDisplayName = member.displayName || "Bilinmeyen Kullanıcı";
          const likeCount = user.maxLike || 0;
      
          embed.addFields({ name: `#${index + 1} - ${userDisplayName}`, value: `\`Like Sayısı: ${likeCount}\``, inline: true });
        });
    msg.edit({embeds:[embed]})
    i.reply({content:""})
    }
  }
  })

}
)
}
}
}

module.exports = Leaderboard;