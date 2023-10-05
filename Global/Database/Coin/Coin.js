const mongoose = require('mongoose');
module.exports =  mongoose.model("luhux-coin", mongoose.Schema({
    guildID: { type: String, default: "" },
    userID: { type: String, default: "" },
    coin: { type: Number, default: 0 },
    beklemeSuresi: { type: Number, default: Date.now() },
    gameSize:{type:Number,default:0},
    dailyCoinDate:{type:Number,default:Date.now()},
}));