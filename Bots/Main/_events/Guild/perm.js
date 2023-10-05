const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const Perms = require("../../../../Global/Database/Perms/perm")
class Perm extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            enabled: true,
        });
    }
    
 async onLoad(message) {
if(message.member.user.bot) return;
const data = await Perms.findOne({guildID:message.guild.id})
const permsData = data ? data.perms : [];
let args = message.content.toLocaleLowerCase().substring(client.prefix.some(x => x.length)).split(" ");
let talentPerm = permsData.find((e) => e.permName === args[0]);
console.log(talentPerm)
if (talentPerm) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (Array.isArray(talentPerm.staffRoleID) ? !talentPerm.staffRoleID.some(app=> message.member.roles.cache.has(app)) : !message.member.roles.cache.has(talentPerm.staffRoleID) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)&& !message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)&& !message.member.permissions.has(PermissionsBitField.Flags.BanMembers) && !client.owners.includes(message.author.id)) return    await message.react(await emojiBul("appEmoji_carpi"))
    if (!member) return  await message.react(await emojiBul("appEmoji_carpi"))
    if (Array.isArray(talentPerm.permID) ? talentPerm.permID.some(app=> member.roles.cache.has(app)) : member.roles.cache.has(talentPerm.permID)) {
      let removedRoles = member.roles.cache.filter(x=> Array.isArray(talentPerm.permID) ? talentPerm.permID.some(y=> x.id === y) : talentPerm.permID == x.id).map(x=> x.id)
      member.roles.remove(removedRoles)
      message.channel.send({embeds:[new EmbedBuilder().setAuthor({name: message.author.tag,  iconURL:message.author.avatarURL({ dynamic: true })})
    .setDescription(`${member} kullanıcısından ${Array.isArray(talentPerm.permID) ? talentPerm.permID.map(x=> `<@&${x}>`) : `<@&${talentPerm.permID}>`} ${Array.isArray(talentPerm.permID) ? "rolleri" : `rolü`} alındı.`)]}).then(e => setTimeout(() => e.delete(), 5000))
    } else {
      member.roles.add(talentPerm.permID)
      message.channel.send({embeds:[new EmbedBuilder().setAuthor({name: message.author.tag,  iconURL:message.author.avatarURL({ dynamic: true })})
        .setDescription(`${member} kullanıcısına ${Array.isArray(talentPerm.permID) ? talentPerm.permID.map(x=> `<@&${x}>`) : `<@&${talentPerm.permID}>`} ${Array.isArray(talentPerm.permID) ? "rolleri" : `rolü`} rolü verdi.`)]}).then(e => setTimeout(() => e.delete(), 5000))
    }
    await message.react(await emojiBul("appEmoji_tik"))
  }
    }
}

module.exports = Perm
