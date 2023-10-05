const { Event } = require("../../../../Global/Structures/Default.Events");
const messageUser = require("../../../../Global/Database/Message/Message")
const levels = require("../../../../Global/Database/Message/LevelSystem")
const luhuxveri = require('../../../../Global/Database/Luhux/veriler');
const {Guild} = require("../../../../Global/Config/Guild")
const canvafy = require("canvafy");
const reactionMap = new Map();
class messageCreate extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            enabled: true,
        });    
    }    

 async   onLoad(message) {
    if (message.author.bot) return;
    if (message.attachments.size > 0 || message.content.includes('http://') || message.content.includes('https://')) {
    const thumbsUpEmojiId = '<:ad_up:1158036774182977616>';
    const downVoteEmojiId = '<:ad_down:1158036734022529105>';
    
    const allowedChannels = Guild.ReactionKanal;
    
    if (allowedChannels.includes(message.channel.id)) {
        try {
            await message.react(thumbsUpEmojiId);
            await message.react(downVoteEmojiId);
        } catch (error) {
            console.error('Tepki eklenirken bir hata oluştu:', error);
        }
    }

        client.on('messageReactionAdd', async (reaction, user) => {
            if (user.bot) return;
            const thumbsUpEmoji = 'ad_up';
            const downVoteEmoji = 'ad_down';
            
            const allowedChannels = Guild.ReactionKanal;
            
            if (allowedChannels.includes(reaction.message.channel.id) && (reaction.emoji.name === thumbsUpEmoji || reaction.emoji.name === downVoteEmoji)) {
                const messageLink = reaction.message.attachments.first() ? reaction.message.attachments.first().url : reaction.message.content;
            
                if (!reactionMap.has(user.id)) {
                    reactionMap.set(user.id, new Set());
                }
            
                const userReactions = reactionMap.get(user.id);
            
                if (!userReactions.has(messageLink)) {
                    userReactions.add(messageLink);
            
                    if (reaction.emoji.name === thumbsUpEmoji) {
                        try {
                            await luhuxveri.findOneAndUpdate(
                                { imageLinks: messageLink },
                                { 
                                    $inc: { like: 1 }, 
                                    $push: { likes: user.id }, 
                                },
                                { upsert: true } 
                            );
                            console.log(`${user.tag} beğendi!`);
                        } catch (error) {
                            console.error('Veri güncelleme sırasında bir hata oluştu:', error);
                        }
                    } else if (reaction.emoji.name === downVoteEmoji) {
                        try {
                            await luhuxveri.findOneAndUpdate(
                                { imageLinks: messageLink },
                                { 
                                    $inc: { dislike: 1 }, 
                                    $push: { dislikes: user.id },
                                },
                                { upsert: true } 
                            );
                            console.log(`${user.tag} beğenmedi!`);
                        } catch (error) {
                            console.error('Veri güncelleme sırasında bir hata oluştu:', error);
                        }
                    }
                }
            }
        });
    }
   
  }


}    
module.exports = messageCreate;


  