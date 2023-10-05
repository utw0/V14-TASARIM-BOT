
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,VoiceChannel,AttachmentBuilder, ActionRow, TextInputBuilder, ModalBuilder, TextInputStyle } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
class basvuru extends Command {
    constructor(client) {
        super(client, {
            name: "basvuru",
            description: "Yetkili & Sponsor Başvuru",
            usage: ".basvuru",
            category: "Luhux",
            aliases: ["basvuru"],

            enabled: true,
            guildOwner:true,
        });
    }


async onLoad(client) {
client.setMaxListeners(15);
client.on("interactionCreate", async interaction => {
	if (interaction.customId === 'istek-basvuru') {
        const modal = new ModalBuilder()
        .setCustomId('yetkili-basvuru-form')
        .setTitle(`${client.user.username} - Öneri Başvuru`)
        .addComponents(
        new ActionRowBuilder()
        .addComponents(new TextInputBuilder().setCustomId('tecrubeler').setLabel("Öneriniz").setStyle(TextInputStyle.Paragraph).setRequired(true)),
        );
    
    await interaction.showModal(modal);
	}
	if (interaction.customId === 'yetkili-basvuru') {
        const modal = new ModalBuilder()
        .setCustomId('sponsor-basvuru-form')
        .setTitle(`${client.user.username} - Yetkili Başvuru`)
        .addComponents(
        new ActionRowBuilder()
        .addComponents(new TextInputBuilder().setCustomId('isim-yas').setLabel("İsim & Yaş").setStyle(TextInputStyle.Short).setRequired(true)),
        new ActionRowBuilder()
        .addComponents(new TextInputBuilder().setCustomId('baskayerdesponsor').setLabel("Daha önce başka yerde yetkili oldun mu?").setStyle(TextInputStyle.Short).setRequired(true)),
        new ActionRowBuilder()
        .addComponents(new TextInputBuilder().setCustomId('nelerverebilir').setLabel("Bize neler katabilirsin?").setStyle(TextInputStyle.Short).setRequired(true)),
        new ActionRowBuilder()
        .addComponents(new TextInputBuilder().setCustomId('kaccekilis').setLabel("Günde ne kadar aktifsin?").setStyle(TextInputStyle.Short).setRequired(true)),
        new ActionRowBuilder()
        .addComponents(new TextInputBuilder().setCustomId('karsilik').setLabel("Portfolyo varsa link olarak").setStyle(TextInputStyle.Paragraph).setRequired(true)),
        );
    
    await interaction.showModal(modal);
	}
});
    client.on("interactionCreate", async interaction => {
        if (interaction.customId === 'yetkili-basvuru-form') {
            const tecrubeler = await  interaction.fields.getTextInputValue('tecrubeler');
            let sagok = interaction.guild.emojis.cache.get(await emojiBul("appEmoji_sagOk"))

            interaction.guild.channels.cache.find(x=> x.name === "istek-öneri-şikayet").send({
                content:`${interaction.user}`,
                embeds:[
                    new EmbedBuilder()
                    .setAuthor({name:interaction.guild.name,iconURL:interaction.guild.iconURL()})
                    .setThumbnail(interaction.guild.bannerURL())
                    .addFields(

                        {name:`${sagok} İstek&Öneri&Şikayet`,value:`${tecrubeler}`,inline:false},
                
                    )
                    .setFooter({text:`İstek&Öneri&Şikayet`})
                ],
               
            })
            await interaction.reply({content:`Başvurunuz iletildi! en kısa sürede sizinle iletişime geçilicek!`,ephemeral:true})
        }
        if (interaction.customId === 'sponsor-basvuru-form') {
            const isim_yas = interaction.fields.getTextInputValue('isim-yas');
            const baskayerdesponsor = interaction.fields.getTextInputValue('baskayerdesponsor');
            const nelerverebilir = interaction.fields.getTextInputValue('nelerverebilir');
            const kaccekilis = interaction.fields.getTextInputValue('kaccekilis');
            const karsilik = interaction.fields.getTextInputValue('karsilik');
            let sagok = interaction.guild.emojis.cache.get(await emojiBul("appEmoji_sagOk"))
            interaction.guild.channels.cache.find(x=> x.name === "yetkili-basvuru").send({
                content:`${interaction.user}`,
                embeds:[
                    new EmbedBuilder()
                    .setAuthor({name:interaction.guild.name,iconURL:interaction.guild.iconURL()})
                    .setThumbnail(interaction.guild.bannerURL())
                    .addFields(
                        {name:`${sagok} İsim ve Yaş`,value:`${isim_yas}`,inline:false},
                        {name:`${sagok} Daha önce başka yerde yetkili oldun mu? [Evet/Hayır]`,value:`${baskayerdesponsor}`,inline:false},
                        {name:`${sagok} Bize neler katabilirsin?`,value:`${nelerverebilir}`,inline:false},
                        {name:`${sagok} Günde ne kadar aktifsin?`,value:`${kaccekilis}`,inline:false},
                        {name:`${sagok} Portfolyo varsa link olarak`,value:`${karsilik}`,inline:false},
                    )
                    .setFooter({text:`Yetkili Başvuru Form`})
                ],
               
            })
            await interaction.reply({content:`Başvurunuz iletildi! en kısa sürede sizinle iletişime geçilicek!`,ephemeral:true})
        }
    });
    }

 async onRequest (client, message, args,embed) {
    message.channel.send({
    embeds:[embed.setDescription(`Merhaba **${message.guild.name}** üyeleri, aşağıda ki butonları kullanarak \`Yetkili-Başvuru - İstek&Öneri&Şikayet\` için başvuru yapabilirsiniz!`).setImage(message.guild.bannerURL({size:1024}))]
    ,components:[
        new ActionRowBuilder()
        .setComponents(
            new ButtonBuilder().setCustomId("yetkili-basvuru").setLabel("Yetkili Başvuru").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("istek-basvuru").setLabel("İstek&Öneri&Şikayet").setStyle(ButtonStyle.Primary),
        

        )
    ]})

 }
}
module.exports = basvuru;
