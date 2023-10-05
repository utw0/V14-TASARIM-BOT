const { Event } = require("../../../../Global/Structures/Default.Events");
const messageUser = require("../../../../Global/Database/Message/Message")
const levels = require("../../../../Global/Database/Message/LevelSystem")
const luhuxveri = require('../../../../Global/Database/Luhux/veriler');
const {Guild} = require("../../../../Global/Config/Guild")
const canvafy = require("canvafy");
class messageCreate extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            enabled: true,
        });    
    }    

 async   onLoad(message) {
    if (message.author.bot) return;
    const content = message.content.toLowerCase();
    const allowedChannels = Guild.ImageKanallar; 
    
    if (message.attachments.size > 0) {
        if (allowedChannels.includes(message.channel.id)) {
            message.attachments.forEach(async (attachment) => {
                const newLink = new luhuxveri({
                    userID: message.author.id,
                    channelID: message.channel.id,
                    imageLinks: [attachment.url],
                });
    
                try {
                    await newLink.save();
                    console.log('Dosya kaydedildi:', attachment.url);
                } catch (error) {
                    console.error('Dosya kaydı sırasında hata oluştu:', error);
                }
            });
        }
    }
    
    if (content.includes('http://') || content.includes('https://')) {
        const links = content.match(/(https?:\/\/[^\s]+)/g);
    
        if (links && links.length > 0) {
            if (allowedChannels.includes(message.channel.id)) {
                links.forEach(async (link) => {
                    const newLink = new luhuxveri({
                        userID: message.author.id,
                        channelID: message.channel.id,
                        imageLinks: [link],
                    });
    
                    try {
                        await newLink.save();
                        console.log('Link kaydedildi:', link);
                    } catch (error) {
                        console.error('Link kaydı sırasında hata oluştu:', error);
                    }
                });
            }
        }
    }
  }


}    
module.exports = messageCreate;


  