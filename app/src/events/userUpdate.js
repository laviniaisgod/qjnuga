const Discord = require('discord.js');
const config = require("../../config.json");
const db = require("quick.db");
const {MessageEmbed} = require("discord.js");
const client = global.client;


module.exports = async function(oldUser, newUser) {
    const guild = client.guilds.cache.get(config.Guild.GuildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === config.roles.team)
    const member = guild.members.cache.get(newUser.id)
    const embed = new MessageEmbed().setTimestamp().setFooter(`🜅 OCEANOS`)
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(config.registration.GuilDTag) && !newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.remove(config.roles.team)
            client.channels.cache.get(config.logs.taglog).send(embed.setDescription(`${newUser} İsminden \`${config.registration.GuilDTag}\` Çıkartarak tagımızdan ayrıldı!`))
        } else if (!oldUser.username.includes(config.registration.GuilDTag) && newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.add(config.roles.team)
            client.channels.cache.get(config.channels.chat).send(`${newUser} \`${config.registration.GuilDTag}\` Tag alarak aramıza katıldı!`)
            client.channels.cache.get(config.logs.taglog).send(embed.setDescription(`${newUser} İsmine \`${config.registration.GuilDTag}\` Alarak tagımıza katıldı!`))
        }
    }
}

module.exports.conf = {
    name: "userUpdate"
}