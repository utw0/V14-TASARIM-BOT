const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');


class messageCreate extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            enabled: true,
        });
    }
    
 async onLoad(message) {
       
        if (message.author.bot || !client.prefix.some(x => message.content.startsWith(x)) || !message.channel || message.channel.type != 0) return;
        let args = message.content.substring(client.prefix.some(x => x.length)).split(" ");
        let _find = args[0].toLocaleLowerCase()
        args = args.splice(1);
        let command = client.commands.get(_find) || client.aliases.get(_find);
        let embed = new EmbedBuilder().setColor("2F3136").setAuthor({
            name: message.guild.name,
            iconURL: message.guild.iconURL()
        })
    
        if(command) {
           
                if(((command.developer && command.developer === true) && !client.owners.includes(message.author.id)))  return message.reply({embeds: [embed.setDescription(`Bu komutu sadece ${client.owners.map(x=> `<@${x}>`).join(", ")} kullanabilir.`)]}).then(msg => {
                    setTimeout(() => {
                            message.delete().catch(err => {})
                            msg.delete().catch(err => {})
                    }, 5000)
                });
                if(((command.guildOwner && command.guildOwner === true) &&  ![message.guild.ownerId, ...client.owners].some(x=> x === message.author.id)))  return message.reply({embeds: [embed.setDescription(`Bu komutu sadece sunucu sahibi kullanabilir.`)]}).then(msg => {
                    setTimeout(() => {
                            message.delete().catch(err => {})
                            msg.delete().catch(err => {})
                    }, 5000)
                });
                if(command.permissions && command.permissions.length > 0) {
                    if((!command.permissions.some(perm => message.member.permissions.has(perm) || message.member.roles.cache.has(perm) || message.author.id === perm))) return message.reply({embeds: [embed.setDescription(`Bu komutu kullanabilmek için ${command.permissions.filter(x=> message.guild.roles.cache.get(x)).length > 0 ? command.permissions.filter(x=> message.guild.roles.cache.get(x)).map(x=> message.guild.roles.cache.get(x).name).splice(0,3).join(", ") + " rollerine" : " uygun rollere"}  ihtiyacın var.`)]}).then(msg => {
                        setTimeout(() => {
                            message.delete().catch(err => {})
                            msg.delete().catch(err => {})
                      }, 5000)
                    });
                 }
            
            if(command.cooldown && cooldown.has(`${command.name}${message.author.id}`)) return message.reply({embeds: [embed.setDescription(`Bu komutu <t:${String(cooldown.get(`${command.name}${message.author.id}`)).slice(0, 10)}:R> kullanabilirsiniz.`)]}).then(msg => {
                setTimeout(() => {
                    msg.delete().catch(err => {})
                }, 5000)
            });
        
            command.onRequest(client, message, args,embed)
            if(message.guild.ownerId != message.author.id && !client.owners.includes(message.author.id) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    cooldown.delete(`${command.name}${message.author.id}`)
                }, command.cooldown);
            }
        }
        
    }
}

module.exports = messageCreate
