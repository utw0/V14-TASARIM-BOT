
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")

const CoinDb = require("../../../../Global/Database/Coin/Coin")


class taskagitmakas extends Command {
    constructor(client) {
        super(client, {
            name: "taskagitmakas",
            description: "taskagitmakas",
            usage: ".taskagitmakas <1-50.000>",
            category: "Economy",
            aliases: ["tkm","taskagitmakas"],
            cooldown:15,
            enabled: true,
            });
    }
async onRequest (client, message, args,embed) {
let betCoin = Number(args[0])
if(!betCoin || !Number(args[0])) return message.reply({content:`Kaç coin ile oynamak istiyorsun ?`})
if(betCoin >= 50000) return message.reply({content:"50.000 coinden fazla bir coin ile oyun oynamayazsın"})
const coin = message.guild.emojis.cache.find(x=> x.name == "appEmoji_coin");
const messageMemberCoinData = await CoinDb.findOne({guildID:message.guild.id,userID:message.member.id})
if(!messageMemberCoinData)await CoinDb.findOneAndUpdate({guildID:message.guild.id,userID:member.id},{$set:{coin:100,beklemeSuresi:Date.now(),gameSize:0,dailyCoinDate:(Date.now() - 86400000)}},{upsert:true})
if(messageMemberCoinData.coin < betCoin) return message.reply({content:`Bu miktarla oynayabilmek için **${betCoin - messageMemberCoinData.coin}\`** daha coine ihtiyacın var.`}) 
let row;
await message.channel.send({
  components:[
    row = new ActionRowBuilder()
    .setComponents(
      new ButtonBuilder().setCustomId("tas").setLabel("Taş").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("kagit").setLabel("Kağıt").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("makas").setLabel("Makas").setStyle(ButtonStyle.Secondary),
    )
  ],
  content:`${coin} ${message.member}, Taş mı ?, Kağıt mı ? yoksa Makas mı ?`}).then(async msg => {
  var filter = (button) => button.user.id === message.author.id;
  const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
  collector.on('collect', async (inter) => {
    await inter.deferUpdate()
    var liste=["kagit","makas","tas"];
    const sonuc = await liste[Number(Math.floor(Math.random()*3))];
  const secim = inter.customId;
  inter.channel.send({content:`${message.member}, **Eller kaldırıldı geri sayım başlıyor! <t:${((Date.now()+3000)/1000).toFixed()}:R>**`}).then(async sonucMSG=> {
  if(msg) await msg.delete();
  setTimeout(async() => {
    if(secim ==sonuc)
    {
      sonucMSG.edit({components:[row],content:`**Berabere! Kaldınız, Tekrar Oynayınız!**`})  

    }
    else if(sonuc==liste[0] && secim==liste[1])
    {
      await CoinDb.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{coin:(betCoin*2),gameSize:1}},{upsert:true})
      sonucMSG.edit({content:`**Kazandın! ${inter.user}, Makas kağıdı keser! ${betCoin*2} ${coin} coin hesabına eklendi!**`})  
    }
    else if(sonuc==liste[0] && secim==liste[2])
    {
      await CoinDb.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{coin:-betCoin,gameSize:1}},{upsert:true})
      sonucMSG.edit({content:`**Kaybettin! ${inter.user}, kağıt taşı sarar! ${betCoin} ${coin} coin hesabından alındı!**`})  
    }
    else if(sonuc==liste[1] && secim==liste[0])
    {
      await CoinDb.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{coin:-betCoin,gameSize:1}},{upsert:true})
      sonucMSG.edit({content:`**Kaybettin! ${inter.user}, Makas kağıdı keser! ${betCoin} ${coin} coin hesabından alındı!**`})  
    }
    else if(sonuc==liste[1] && secim==liste[1])
    {
      sonucMSG.edit({content:`**Berabere Kaldınız!`})
    }
    else if(sonuc==liste[1] && secim==liste[2])
    {
      await CoinDb.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{coin:(betCoin*2),gameSize:1}},{upsert:true})
      sonucMSG.edit({content:`**Kazandın! ${inter.user}, Taş makası kırar! ${betCoin*2} ${coin} coin hesabına eklendi!**`})   
        }
    else if(sonuc==liste[2] && secim==liste[0])
    {
      await CoinDb.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{coin:(betCoin*2),gameSize:1}},{upsert:true})
      sonucMSG.edit({content:`**Kazandın! ${inter.user}, Kağıt taşı sarar! ${betCoin*2} ${coin} coin hesabına eklendi!**`})  
    }
    else if(sonuc==liste[2] && secim==liste[1])
    {
      await CoinDb.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{coin:-betCoin,gameSize:1}},{upsert:true})
      sonucMSG.edit({content:`**Kaybettin! ${inter.user}, Taş makası kırar! ${betCoin} ${coin} coin hesabından alındı!**`})  
    }
    else if(sonuc==liste[2] && secim==liste[2])
    {
      sonucMSG.edit({content:`**Berabere Kaldınız!**`})
    }
  }, 2000);
  })
  })
})

 
}}

module.exports = taskagitmakas;