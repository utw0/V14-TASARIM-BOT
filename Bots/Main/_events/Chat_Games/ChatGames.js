const { Event } = require("../../../../Global/Structures/Default.Events");
const {Guild} = require("../../../../Global/Config/Guild")
const {EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,AttachmentBuilder} = require("discord.js")
const coinDB = require("../../../../Global/Database/Coin/Coin")
var size = 0;
class findTheFullChest extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            enabled: true,
        });    
    }    

 async   onLoad(message) {

if(message.channel.id !=Guild.ChatChannel) return;
size++;
if(size == 150){
    const tıklakazan = new ActionRowBuilder({components:[new ButtonBuilder().setCustomId("tiklakazan").setLabel("Tıkla!").setEmoji(await emojiBul("appEmoji_elmas")).setStyle(ButtonStyle.Secondary)]})
    message.channel.send({components:[tıklakazan],files: [ new AttachmentBuilder().setFile("https://cdn.discordapp.com/attachments/1011397607685374033/1061407355423703110/tklakazan.png").setName("tiklakazan.png")]}).then(async msg =>{
    const collector = msg.createMessageComponentCollector({ time: 10000 });
    var tkBasanlar = [];
    collector.on('collect', async (i) => {
    const sayi = await Math.floor(Math.random()*2);
    if(tkBasanlar.includes(i.user.id)) return i.reply({content:`**Bu oyundan elendiniz. Sırada ki oyunda bol şans**`,ephemeral:true})
    if (i.customId == "tiklakazan") {
    if(sayi == 1){
    const coin = await Math.floor(Math.random()*500);
    i.reply({content:`**Tebrikler, __${coin}__ Adet Coin ${i.guild.emojis.cache.find(x=> x.name == "appEmoji_coin")} Kazandın!**`,ephemeral:true})  
    await coinDB.findOneAndUpdate({guildID:message.guild.id,userID:i.user.id},{$inc:{coin:coin,gameSize:1}},{upsert:true}) 
    if (msg) await msg.delete()
    tkBasanlar = [];
    } else {
        tkBasanlar.push(i.user.id)
    i.reply({files:[new AttachmentBuilder().setFile("https://cdn.discordapp.com/attachments/1011397607685374033/1061409527850872913/1061388565247967374.gif").setName("kazanamadin.gif")],ephemeral:true})
    }
    }
    })
    collector.on("end", async (collected, reason) => {
        if (reason === "time") {
            tkBasanlar = [];
          if (msg) await msg.delete()
        }
      });
    })

} else if (size == 300){
    size = 0;
    const satirBir = new ActionRowBuilder({components:[
        new ButtonBuilder().setCustomId("1").setEmoji(await emojiBul("appEmoji_bir")).setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("2").setEmoji(await emojiBul("appEmoji_iki")).setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("3").setEmoji(await emojiBul("appEmoji_uc")).setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("4").setEmoji(await emojiBul("appEmoji_dort")).setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("5").setEmoji(await emojiBul("appEmoji_bes")).setStyle(ButtonStyle.Secondary),
    ]})
     message.channel.send({components:[satirBir],files: [ new AttachmentBuilder().setFile("https://cdn.discordapp.com/attachments/1011397607685374033/1061413475043254342/dolusandik.png").setName("tiklakazan.png")]})
     .then(async msg => {
     const sayi = await Math.floor(Math.random()*6);;
     console.log(sayi)
     const collector = msg.createMessageComponentCollector({ time: 10000 });
     var dkbBasanlar = [];
     collector.on('collect', async (i) => {
        if(dkbBasanlar.includes(i.user.id)) return i.reply({content:`**Bu oyundan elendiniz. Sırada ki oyunda bol şans!**`,ephemeral:true})
        if (i.customId == `${sayi}`) {
        const coin = await Math.floor(Math.random()*1000);
        i.reply({content:`**Tebrikler doğru kasayı buldun, __${coin}__ Adet Coin ${i.guild.emojis.cache.find(x=> x.name == "appEmoji_coin")} Kazandın!**`,ephemeral:true})    
        await coinDB.findOneAndUpdate({guildID:message.guild.id,userID:i.user.id},{$inc:{coin:coin,gameSize:1}},{upsert:true}) 
        if (msg) await msg.delete()
        dkbBasanlar = [];
        } else {
            dkbBasanlar.push(i.user.id)
        i.reply({files:[new AttachmentBuilder().setFile("https://cdn.discordapp.com/attachments/1011397607685374033/1061409527850872913/1061388565247967374.gif").setName("kazanamadi.png")],ephemeral:true})
        }
        })
        collector.on("end", async (collected, reason) => {
            if (reason === "time") {
                dkbBasanlar = [];
              if (msg) await msg.delete()
            }
          });
     })
}
}
    }  


module.exports = findTheFullChest;
