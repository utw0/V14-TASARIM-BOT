const { EmbedBuilder,Formatters,ActionRowBuilder ,StringSelectMenuBuilder,ButtonBuilder} = require('discord.js');
const { Command } = require("../../../../Global/Structures/Default.Commands");
const messageUser = require("../../../../Global/Database/Message/Message")
const voiceUser = require("../../../../Global/Database/Voice/VoiceUsers")
const Coin = require("../../../../Global/Database/Coin/Coin")
const luhuxveri = require('../../../../Global/Database/Luhux/veriler');
class luhuxbaba extends Command {
    constructor(client) {
        super(client, {
            name: "Portfolyo",
            description: "Kullanıcı Profiliniz2",
            usage: ".Portfolyo",
            category: "Global",
            aliases: ["portfolyo","port","Port","porno"],
            enabled: true,

            cooldown: 3500,

        });
    }
    
   async onRequest (client, message, args) {
    let tik = message.guild.emojis.cache.find(x=> x.name == "appEmoji_profil") ? message.guild.emojis.cache.find(x=> x.name == "appEmoji_profil") :"✅"
    let tik2 = message.guild.emojis.cache.find(x=> x.name == "appEmoji_kup") ? message.guild.emojis.cache.find(x=> x.name == "appEmoji_kup") :"✅"
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let member = message.guild.members.cache.get(user.id)
    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });
    const data = await luhuxveri.find({}, { imageLinks: 1 });
    const imageLinks = data.map((entry) => entry.imageLinks).flat();

    const userId = user.id;
    const allData = await luhuxveri.find({ userID: user.id });
    const userPosts = allData.filter((data) => data.userID === userId);
    
    const options = userPosts.map((data, index) => ({
      label: `Gönderi Sırası: ${index + 1}.`,
      description: `${moment(data.date).format('DD.MM.YYYY HH:mm')} Like: ${data.like || 0} Dislike: ${data.dislike || 0}`,
      value: `option_${index}`,
    }));
    
    const manitamıöziedlm = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('sex')
        .setOptions(options)
        .setPlaceholder('Kullanıcının Diğer Gönderileri:')
    );
    
    const embed = new EmbedBuilder()
      .setAuthor({ name: message.member.user.username, iconURL: message.member.user.avatarURL({ dynamic: true }) })
      .setColor("2F3136")
      .setFooter({ text: `luhux was here` })
      .setDescription(`${member} \`Kişisinin portfolyosunu menülerden kontrol edebilirsin\``);
    
    if (userPosts.length > 0 && userPosts[0].imageLinks.length > 0) {
      embed.setImage(userPosts[0].imageLinks[0]);
    }
    
    message.reply({ embeds: [embed], components: [manitamıöziedlm] });
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isSelectMenu()) return; 
  const selectedOption = interaction.values[0]; 
  
  const selectedData = allData.find((data, index) => `option_${index}` === selectedOption);
  if (selectedData) {
    const likersList = selectedData.likes.length > 0 ? selectedData.likes.map(userId => `<@${userId}>`).join(', ') : 'Beğeni Almamış';
    const selectedEmbed = new EmbedBuilder()
      .setAuthor({
        name: interaction.guild.name,
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      })
      .setFooter({ text: `luhux was here` })
      .setDescription(`<t:${(selectedData.date / 1000).toFixed()}:f> tarihinde ki paylaşımın bilgileri aşşağıda verilmiştir\n`)
      .addFields({ name: `${tik2} **Paylaşım Bilgileri**`, value: `**Like Sayısı:** \`${selectedData.like || 0}\`\n**Dislike Sayısı:** \`${selectedData.dislike || 0}\``, inline: true })
      .addFields({ name: `${tik2} **Paylaşımı Beğenenler**`, value: `${likersList}`, inline: false });
  
    if (selectedData.imageLinks[0]) {
      if (selectedData.imageLinks[0].endsWith('.mp4')) {
        selectedEmbed.addFields(
          { name: 'Video', value: `[Video Linki](${selectedData.imageLinks[0]})`, inline: false }
        );
      } else {
        selectedEmbed.setImage(selectedData.imageLinks[0]);
      }
    }
    
    interaction.reply({content:""});
    await msg2.edit({ embeds: [selectedEmbed] });
  }
});
}
   }

module.exports = luhuxbaba