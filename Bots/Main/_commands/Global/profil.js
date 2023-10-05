const { EmbedBuilder,Formatters,ActionRowBuilder ,ButtonStyle,ButtonBuilder} = require('discord.js');
const { Command } = require("../../../../Global/Structures/Default.Commands");
const messageUser = require("../../../../Global/Database/Message/Message")
const voiceUser = require("../../../../Global/Database/Voice/VoiceUsers")
const Coin = require("../../../../Global/Database/Coin/Coin")
const luhuxveri = require('../../../../Global/Database/Luhux/veriler');
class Porno extends Command {
    constructor(client) {
        super(client, {
            name: "Profil",
            description: "Kullanıcı Profiliniz",
            usage: ".profil",
            category: "Global",
            aliases: ["profil","me","Me","Profil"],
            enabled: true,
// zaman zaman zaman herşeyi aldın benden
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
    const imageLinksCounts = await luhuxveri.aggregate([
        {
            $match: {
                userID: user.id 
            }
        },
        {
            $project: {
                imageLinksCount: {
                    $size: "$imageLinks"
                }
            }
        }
    ]);
    let totalImageLinksCount = 0;
    imageLinksCounts.forEach((doc) => {
        totalImageLinksCount += doc.imageLinksCount;
    });
    const likesArray = await luhuxveri.aggregate([
        {
            $match: {
                userID: user.id 
            }
        },
        {
            $unwind: "$likes"
        }
    ]);
    const totalLikesCount = likesArray.length;

    const Dsilikes = await luhuxveri.aggregate([
        {
            $match: {
                userID: user.id 
            }
        },
        {
            $unwind: "$dislikes"
        }
    ]);
    const disliketotal = Dsilikes.length;
    const result = await luhuxveri.aggregate([
        {
            $match: {
                userID: user.id 
            }
        },
        {
            $project: {
                _id: 0, 
                imageLinks: 1, 
                like: 1, 
            }
        },
        {
            $unwind: "$imageLinks" 
        },
        {
            $group: {
                _id: "$imageLinks",
                totalLikes: { $sum: "$like" } 
            }
        },
        {
            $sort: { totalLikes: -1 } 
        },
        {
            $limit: 1 
        }
    ]);
    
    if (result.length > 0) {
        const mostLikedImage = result[0]; 
    
        const embed = new EmbedBuilder()
            .setAuthor({ name: message.member.user.username, iconURL: message.member.user.avatarURL({ dynamic: true }) })
            .setColor("2F3136")
            .setFooter({ text: `En son atılan paylaşım` })
            .setImage(mostLikedImage._id)
            .setDescription(`${member} Kişisinin profil bilgileri;`)
            .addFields({ name: `${tik} **Kullanıcı Bilgileri**`, value: `**Kullanıcı Adı:** ${member}\`(${member.displayName})\`\n**Mesaj:** \`${Number(messageData ? messageData.totalStat : 0).toLocaleString()} Mesaj\`\n**Ses:** \`${moment.duration(voiceData ? voiceData.totalStat : 0).format("H [Saat], m [dakika]")}\`\n**Sunucuya Katılım:** <t:${Math.floor(user.joinedTimestamp / 1000)}:R>\n**Hesap Oluşturma:** <t:${Math.floor(user.user.createdTimestamp / 1000)}:R>`, inline: true })
            .addFields({ name: `${tik2} **Paylaşım Bilgileri**`, value: `**Like Sayısı:** \`${totalLikesCount}\`\n**Dislike Sayısı:** \`${disliketotal}\`\n**Paylaşım:** \`${totalImageLinksCount}\`\n`, inline: true });
    
        message.reply({ embeds: [embed] });
    } else {
        const embed = new EmbedBuilder()
            .setAuthor({ name: message.member.user.username, iconURL: message.member.user.avatarURL({ dynamic: true }) })
            .setColor("2F3136")
            .setFooter({ text: `luhux was here` })
            .setDescription(`${member} Kişisinin profil bilgileri;`)
            .addFields({ name: `${tik} **Kullanıcı Bilgileri**`, value: `**Kullanıcı Adı:** ${member}\`(${member.displayName})\`\n**Mesaj:** \`${Number(messageData ? messageData.totalStat : 0).toLocaleString()} Mesaj\`\n**Ses:** \`${moment.duration(voiceData ? voiceData.totalStat : 0).format("H [Saat], m [dakika]")}\`\n**Sunucuya Katılım:** <t:${Math.floor(user.joinedTimestamp / 1000)}:R>\n**Hesap Oluşturma:** <t:${Math.floor(user.user.createdTimestamp / 1000)}:R>`, inline: true })
            .addFields({ name: `${tik2} **Paylaşım Bilgileri**`, value: `**Like Sayısı:** \`${totalLikesCount}\`\n**Dislike Sayısı:** \`${disliketotal}\`\n**Paylaşım:** \`${totalImageLinksCount}\`\n`, inline: true });
    
        message.reply({ embeds: [embed] });
    }
}
   }

module.exports = Porno