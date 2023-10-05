
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const Coin = require("../../../../Global/Database/Coin/Coin")

class dailyCoin extends Command {
    constructor(client) {
        super(client, {
            name: "gunluk",
            description: "hm",
            usage: ".daily",
            category: "Economy",
            aliases: ["günlük","gunluk","daily"],
            enabled: true,
        });
    }
 async onRequest (client, message, args,embed) {

    const member = message.member
    const coinEmoji = message.guild.emojis.cache.find(x=> x.name == "appEmoji_coin");
    const data = await Coin.findOne({guildID:message.guild.id,userID:member.id})
    if(!data) return message.reply({embeds:[embed.setDescription(`${message.member}, **Coin** Profiliniz bulunmamaktadır. \`.coin\` yazarak profilinizi oluşturabilirsiniz.`)]}) 
    if(Date.now() >= (data.dailyCoinDate + 86400000)){
        const sayi = await Math.floor(Math.random()*3);
        message.channel.send({
            files:[new AttachmentBuilder().setFile("https://cdn.discordapp.com/attachments/1075535580517113986/1078028663355879444/dhd.png")],
        components:[
            new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder().setCustomId("1").setEmoji(await emojiBul("Kirmizi")).setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("2").setEmoji(await emojiBul("Kirmizi")).setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("3").setEmoji(await emojiBul("Kirmizi")).setStyle(ButtonStyle.Secondary),
            )
        ]}).then(async msg =>{
            const collector = msg.createMessageComponentCollector({ time: 10000 });
    collector.on('collect', async (i) => {
        if(i.customId == `1`){
            const coin = await Math.floor(Math.random()*500);
            i.reply({content:`**Tebrikler, __${coin}__ Adet Coin ${i.guild.emojis.cache.find(x=> x.name == "appEmoji_coin")} Kazandın!**`,ephemeral:true})  
            await Coin.findOneAndUpdate({guildID:message.guild.id,userID:i.user.id},{$inc:{coin:coin}},{upsert:true}) 
            await Coin.findOneAndUpdate({guildID:message.guild.id,userID:i.user.id},{$set:{dailyCoinDate:Date.now()}},{upsert:true}) 
            if (msg) await msg.delete()
            } 
            if(i.customId == `2`){
                const coin = await Math.floor(Math.random()*500);
                i.reply({content:`**Tebrikler, __${coin}__ Adet Coin ${i.guild.emojis.cache.find(x=> x.name == "appEmoji_coin")} Kazandın!**`,ephemeral:true})  
                await Coin.findOneAndUpdate({guildID:message.guild.id,userID:i.user.id},{$inc:{coin:coin}},{upsert:true}) 
                await Coin.findOneAndUpdate({guildID:message.guild.id,userID:i.user.id},{$set:{dailyCoinDate:Date.now()}},{upsert:true}) 
                if (msg) await msg.delete()
                } 
                if(i.customId == `3`){
                    const coin = await Math.floor(Math.random()*500);
                    i.reply({content:`**Tebrikler, __${coin}__ Adet Coin ${i.guild.emojis.cache.find(x=> x.name == "appEmoji_coin")} Kazandın!**`,ephemeral:true})  
                    await Coin.findOneAndUpdate({guildID:message.guild.id,userID:i.user.id},{$inc:{coin:coin}},{upsert:true}) 
                    await Coin.findOneAndUpdate({guildID:message.guild.id,userID:i.user.id},{$set:{dailyCoinDate:Date.now()}},{upsert:true}) 
                    if (msg) await msg.delete()
                    } 
    })    
        })
        if(message) await message.react(await emojiBul("appEmoji_tik"))
    }    else{
        if(message) await message.react(await emojiBul("appEmoji_carpi"))
        message.reply({content:`**Günlük Coin Alamazsın! \n <t:${((data.dailyCoinDate+86400000)/1000).toFixed()}:R> günlük coin alabilirsin.**`})

    }
}
}
module.exports = dailyCoin;