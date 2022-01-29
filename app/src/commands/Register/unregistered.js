const config = require("../../../config.json")
const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
module.exports = {
    name: "unregistered",
    aliases: ["unreg", "ks", "kayıtsız"],
    execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor('#36393f').setDescription('Kullanmış olduğunuz register etkileşimi başarısız sonuçlandı!').setFooter(`Eğer komutu kullanmaya devam edersen engelleneceksin.`));
 let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!kullanıcı) return message.channel.send(embed.setDescription(`Geçerli bir kullanıcı belirtmelisin!`))
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  message.guild.members.cache.get(member.id).roles.cache.forEach(r => {
message.guild.members.cache.get(member.id).roles.remove(r)

})
  member.roles.add((config.registration.unregistered))
  member.setNickname(config.registration.autonickname);
  message.channel.send(embed.setDescription(`${member} kullanıcı başarıyla kayıtsıza (<@&${config.registration.unregistered}>) atıldı!`))

}


  }
