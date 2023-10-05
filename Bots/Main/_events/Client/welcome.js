const { Collection, EmbedBuilder, PermissionsBitField,Formatters,ActionRowBuilder, ButtonBuilder, codeBlock } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');
const {Guild} = require("../../../../Global/Config/Guild")


class guildMemberAdd extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberAdd",
            enabled: true,
        });
    }
    
 async onLoad(member) {
        const guild = client.guilds.cache.get(Guild.ID);
        if(member.guild.id == guild.id){
        const welcomeChannel = guild.channels.cache.get(Guild.ChatChannel);
            await member.roles.add(Guild.MemberRol)
            if(welcomeChannel) return  welcomeChannel.send({content:`Welcome to ${message.guild.name}!! ${member} :tada: :tada:`}).then(sentMessage => {
                sentMessage.delete({ timeout: 7000 });
              })
              
          
    
        }
    }
}

module.exports = guildMemberAdd
