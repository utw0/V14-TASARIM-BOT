const { Collection, InteractionType} = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');
const transcript = require('discord-html-transcripts');
const {Guild} = require("../../../../Global/Config/Guild")
const { ButtonStyle, EmbedBuilder, ActionRowBuilder ,ButtonBuilder,PermissionFlagsBits,ChannelType} = require('discord.js');
class interactionCreate extends Event {
    constructor(client) {
        super(client, {
            name: "interactionCreate",
            enabled: true,
        });
    }
    
    async onLoad(interaction) {
        if (!interaction.isButton()) return;

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('claim').setLabel('Talep Et').setEmoji('📩').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('close').setLabel('Kapat').setEmoji('🗑').setStyle(ButtonStyle.Danger),
                new ButtonBuilder().setCustomId('transcript').setLabel('Kayıt Et').setEmoji('📁').setStyle(ButtonStyle.Primary)
            )


        let roleStaff = interaction.guild.roles.cache.get(Guild.TicketStaff);

        let AlreadyAChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id);
        if (AlreadyAChannel) return interaction.rely({
            content: ":x: | Sunucuda zaten açık bir biletiniz var",
            ephemeral: true
        });

        if (interaction.customId === "close") {
            let channel = interaction.channel;
            channel.delete()
        } else if (interaction.customId === "claim") {
            interaction.reply({
                embeds: [{
                    description: `Yetkili Destek Geliyor ${interaction.user}`,
                    footer: {
                        text: "Ticket Destek"
                    },
                  
                }]
            })
        } else if (interaction.customId === "transcript") {
            interaction.reply({
                embeds: [{
                    description: `📁 | Kayıt Tamamlandı`,
                    footer: {
                        text: "Ticket Destek"
                    },
                    
                }]
            })

            client.channels.cache.get(Guild.TicketLog).send({
                embeds: [{
                    description: `📁 | Kayıt Odası ${interaction.channel}`,
                    footer: {
                        text: "Ticket Destek"
                    },
                    
                }],
                files: [await transcript.createTranscript(interaction.channel)]
            })
        } else if (interaction.customId === "staff") {
            interaction.guild.channels.create({
                name: `ticket of ${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: Guild.TicketParent,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: roleStaff,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    content: `||${interaction.user}||`,
                    embeds: [{
                        title: "Yetkili Destek Bileti",
                        description: "Bir yetkilinin size mümkün olduğunca net bir şekilde yanıt verebilmesi için lütfen isteğinizi ayrıntılı olarak belirtin.",
                        footer: {
                            text: "Ticket Destek",
                        },
                       
                    }],
                    components: [
                        row
                    ]
                })
                interaction.reply({
                    content: `✅ Ticketiniz başarıyla açıldı. <#${c.id}>`,
                    ephemeral: true
                })
            })

        } else if (interaction.customId === "answer") {
            interaction.guild.channels.create({
                name: `ticket of ${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: Guild.TicketParent,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: roleStaff,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    content: `||${interaction.user}||`,
                    embeds: [{
                        title: "Sorununuz",
                        description: "Bir yetkilinin size mümkün olduğunca net bir şekilde yanıt verebilmesi için lütfen isteğinizi ayrıntılı olarak belirtin.",
                        footer: {
                            text: "Ticket Support",
                        },
                       
                    }],
                    components: [
                        row
                    ]
                })
                interaction.reply({
                    content: `✅ Ticketiniz başarıyla açıldı. <#${c.id}>`,
                    ephemeral: true
                })
            })
        } else if (interaction.customId === "other") {
            interaction.guild.channels.create({
                name: `ticket of ${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: Guild.TicketParent,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: roleStaff,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    content: `||${interaction.user}||`,
                    embeds: [{
                        title: "Sorununuz",
                        description: "Bir yetkilinin size mümkün olduğunca net bir şekilde yanıt verebilmesi için lütfen isteğinizi ayrıntılı olarak belirtin.",
                        footer: {
                            text: "Ticket Destek",
                        },
                      
                    }],
                    components: [
                        row
                    ]
                })
                interaction.reply({
                    content: `✅ Ticketiniz başarıyla açıldı. <#${c.id}>`,
                    ephemeral: true
                })
            })
        }
    }
}

module.exports = interactionCreate