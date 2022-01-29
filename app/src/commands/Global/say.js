const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json")
module.exports = {
    name: 'say',
    aliases: ["sayy", "sayı"],
    execute: async (client, message, args, embed, author, channel, guild) => {
       if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı"));
        var TotalMember = message.guild.memberCount
        var Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
        var Taglı = message.guild.members.cache.filter(u => u.user.username.includes(config.registration.GuilDTag)).size;
        var Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
        var Boost = message.guild.premiumSubscriptionCount;

        message.channel.send(new MessageEmbed().setFooter("🜅 OKEANOS", message.guild.iconURL).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`
    \`•\` Sunucumuzda toplam **${TotalMember}** kullanıcı bulunuyor.
    \`•\` Sunucumuzda toplam **${Online}** aktif kullanıcı bulunuyor.
    \`•\` Seste **${Voice}** kullanıcı bulunuyor.
    \`•\` Toplam **${Taglı}** kullanıcı tagımızda bulunuyor.
    `))
      
    }
}