const { Event } = require("../../../../Global/Structures/Default.Events");
const messageUser = require("../../../../Global/Database/Message/Message")
const levels = require("../../../../Global/Database/Message/LevelSystem")
const luhuxveri = require('../../../../Global/Database/Luhux/veriler');
const canvafy = require("canvafy");
class messageCreate extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            enabled: true,
        });    
    }    

 async   onLoad(message) {
    if(message.author.bot) return;
    await messageUser.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: {totalStat: 1  } }, { upsert: true });

  const xpRandom = (length) => {
    return Number(Math.floor(Number(length) * 5 / 3));
  }
  let randomMessageXP = [1, 2, 3, 4, 5, 6 , 7];
  var xp31 = randomMessageXP[Math.floor(Math.random() * randomMessageXP.length)];
  const { xp, gerekli, level } = await levels.findOne({ guildID: message.guild.id, userID: message.author.id }) || { xp: 0, gerekli: 100, level: 0 };
  await levels.updateOne({ guildID: message.guild.id, userID: message.author.id }, {$inc: { xp: xp31.toFixed(3) } }, { upsert: true });
  const xpp = xp + xpRandom(message.content.length);
  if (xpp >= gerekli) {
    if(message.author.bot) return;
    await levels.updateOne({ guildID: message.guild.id, userID: message.author.id }, {$set: { xp: 0 } }, { upsert: true });
    await levels.updateOne({ guildID: message.guild.id, userID: message.author.id }, {$set: { gerekli: gerekli + 500 }}, { upsert: true });
    await levels.updateOne({ guildID: message.guild.id, userID: message.author.id }, {$inc: { level: 1 }}, { upsert: true });
    
    const levelUp = await new canvafy.LevelUp()
    .setAvatar(message.author.avatarURL({ forceStatic: true, extension: "png" }))
    .setBackground("image", "https://media.discordapp.net/attachments/1087030211813593190/1105791147441410129/4zh2hgl46cp51.png?width=1440&height=450")
    .setUsername(message.author.username)
    .setAvatarBorder("#00f2ff")
    .setOverlayOpacity(0.7)
    .setLevels(level,level + 1)
    .build();

    message.reply({
      files: [{
        attachment: levelUp.toBuffer(),
        name: `levelup-${message.member.id}.png`
      }]
    }).then(async msg =>{
      setTimeout(async() => {
        if(msg && msg.deletable) await msg.delete();
       
      }, 7000);
    });
    } else {
      const levelUp = await new canvafy.LevelUp()
      .setAvatar(member.user.avatarURL({ forceStatic: true, extension: "png" }))
      .setBackground("image", "https://media.discordapp.net/attachments/1087030211813593190/1105791147441410129/4zh2hgl46cp51.png?width=1440&height=450")
      .setUsername(message.author.username)
      .setAvatarBorder("#00f2ff")
      .setOverlayOpacity(0.7)
      .setLevels(level,level + 1)
      .build();
  
      message.reply({
        files: [{
          attachment: levelUp.toBuffer(),
          name: `levelup-${message.member.id}.png`
        }]
      }).then(async msg =>{
        setTimeout(async() => {
          if(msg && msg.deletable) await msg.delete();
      
        }, 7000);
      });
    };

   
  }


}    
module.exports = messageCreate;


  