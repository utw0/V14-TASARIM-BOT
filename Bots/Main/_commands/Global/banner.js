const { PermissionsBitField,Formatters,ActionRowBuilder ,ButtonStyle,ButtonBuilder} = require('discord.js');
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { DiscordBanners } = require('discord-banners');
const discordBanners = new DiscordBanners(client);

class Banner extends Command {
    constructor(client) {
        super(client, {
            name: "Banner",
            description: "Kullanıcı bannerını gösterir",
            usage: ".banner",
            category: "Global",
            aliases: ["banner","banne"],
            enabled: true,

            cooldown: 3500,

        });
    }
    
   async onRequest (client, message, args,embed) {
   
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const banner = await discordBanners.getBanner(member.id, { size: 2048, format: "png", dynamic: true })
    if(banner){   
   let link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Tarayıcıda aç", style:ButtonStyle.Link, url: banner})]})
    await message.reply({
        content: `${banner}`
        , components:[link] })}
        if(message) await message.react(await emojiBul("appEmoji_tik"))

    else return cevap(message,"bannerYok")


}
   }

module.exports = Banner
