const { Client, MessageEmbed, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const { readdir } = require("fs");
const config = require("./config.json");
const db = require("quick.db");
const moment = require('moment');
const ms = require("ms");
require("moment-duration-format");
const buttons = require('discord-buttons');
buttons(client)
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
client.cooldown = new Map();
client.commandblocked = [];

require("./src/helpers/function")(client);

readdir("./src/commands/", (err, files) => {
    if (err) console.error(err)
    files.forEach(f => {
        readdir("./src/commands/" + f, (err2, files2) => {
            if (err2) console.log(err2)
            files2.forEach(file => {
                let prop = require(`./src/commands/${f}/` + file);
                console.log(`[OCEANOS-COMMAND] ${prop.name} yüklendi!`);
                commands.set(prop.name, prop);
                prop.aliases.forEach(alias => {
                    aliases.set(alias, prop.name);
                });
            });
        });
    });
});

readdir("./src/events", (err, files) => {
    if (err) return console.error(err);
    files.filter((file) => file.endsWith(".js")).forEach((file) => {
        let prop = require(`./src/events/${file}`);
        if (!prop.conf) return;
        client.on(prop.conf.name, prop)
        console.log(`[OKEANOS-EVENT] ${prop.conf.name} yüklendi!`);
    });
});

client.on("message", async message => {
    if (message.content === ".buton-rol" && message.author.id === config.bot.owner) {
        const Giveaway = new buttons.MessageButton()
            .setStyle("green")
            .setLabel("🎁 Çekiliş Katılımcısı")
            .setID("Giveaway");
        const Activity = new buttons.MessageButton()
            .setStyle("green")
            .setLabel("🎉 Etkinlik Katılımcısı")
            .setID("Activity");

        message.channel.send(`**Merhabalar!**
 
**Çekiliş Katılımcısı alarak** Nitro, Spotify, Netflix ve benzeri çekilişlere katılıp ödül sahibi olabilirsiniz.

**Aşağıda bulunan butonlardan** Etkinlik Katılımcısı alarak konserlerimizden, Oyunlarımızdan, ve etkinliklerimizden faydalanabilirsiniz.

\`NOT:\` Everyone here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.
`,
            {
                buttons: [Giveaway, Activity]
            });
    }

    if (message.content === ".buton-bilgi" && message.author.id === config.bot.owner) {

        const one = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("I")
            .setID("one");

        const two = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("II")
            .setID("two");

        const three = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("III")
            .setID("three");

        const four = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("IV")
            .setID("four");

        const five = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("V")
            .setID("five");
        message.channel.send("**Merhabalar!** \n\nAşşağıdaki butonlarla etkileşime girerek sunucumuzdaki durumunuz hakkında bilgi edinebilirsiniz. \n **1 -** Sunucumuza daha önceden hangi isimlerle kayıt olduğunuzu kontrol edersiniz. \n **2 -** Sunucumuza daha önceden kayıt olup olmadığınızı kontrol edersiniz. \n **3 -** Sunucumuzda daha önceden ceza alıp almadığınızı kontrol edersiniz. \n **4 -** Sunucumuzdaki rollerinizi kontrol edersiniz. \n **5 -** Sunucumuza ne zaman katıldığınızı kontrol edersiniz.", { buttons: [one, two, three, four, five] })
    }
});
client.on('message', msg => {

if(client.ping > 500) {

            let bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london',
            'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 
            'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
            'russia']
           let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
           let sChannel = msg.guild.channels.find(c => c.name === "saldırı-koruma")

           sChannel.send(`Sunucunun ms süresi yükseldiği için bölge değiştirildi!\nYeni bölge: **${yenibölge}** `+ client.ping)
           msg.guild.setRegion(yenibölge)
           .then(g => console.log("🌍 Bölge:" + g.region))
           .then(g => msg.channel.send("Bölge **"+ g.region  + " Olarak değiştirildi!"))
           .then(msg.reply('Bölge değiştirildi! ')) 
           .catch(console.error);
}});

const AntiSpam = require('mcg-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 3, // Kaç mesaj sonra uyaracağı
    kickThreshold: 7, // Kick mesaj sayısı
    banThreshold: 7, // Ban mesaj sayısı
    maxInterval: 2000, // Max spam
    warnMessage: '{@user}, Lütfen yapmış olduğunuz spamı durdurun son uyarım.', // warn mesajı
    kickMessage: '**{user_tag}** Has been kicked for spamming.', // kick mesajı
    banMessage: '**{user_tag}** Has been banned for spamming.', // ban mesajı
    maxDuplicatesKick: 10, //uyarı mesaj aralık
    maxDuplicatesBan: 12, // uyarı mesaj aralık
    exemptPermissions: [ 'ADMINISTRATOR'], // Spam yapsada işlemeyecek roller
    ignoreBots: true // Bot mesajları dahil mi (true/false)
})

client.login(process.env.TOKEN).then(x => console.log(`Bot ${client.user.username} olarak giriş yaptı!`)).catch(err => console.log(`Bot Giriş yapamadı sebep: ${err}`));

client.on('message', async message => {
if (message.content === '!fakekatıl') { 
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});