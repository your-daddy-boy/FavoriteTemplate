const Discord = require('discord.js');
const { version } = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { platform, arch, cpus } = require("os")
let os = require('os')

module.exports = {
	name: 'Stats',
	description: 'Bot statistic and status',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['stats','botinfo'],
	usage: ``,
	cooldown: 0,
	execute(client, message, args) {
    
  const model = cpus()[0].model + " " + arch()
  const tanggalBuat = client.user.createdAt

  const embed = new MessageEmbed()
  
  
    .setAuthor("Statistics", client.user.displayAvatarURL({format: 'png', dynamic: true})+"?size=2048")
    
    .setTimestamp()
    .setThumbnail(client.user.displayAvatarURL())
    .addField("Information",`\`\`\`
Client: ${client.user.username}
Created: ${tanggalBuat}\`\`\``)
  
  
    .addField("System",`\`\`\`
CPU : ${model}
Platform : ${platform}
Websocket : ${client.ws.ping} ms(miliseconds)
Discord : v ${version}
Arch : ${os.arch()}\`\`\``)

  message.channel.send(embed)
}
}/*

const Discord = require("discord.js")

const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")



module.exports = {
	name: 'Stats',
	description: 'Bot statistic and status',
  guildOnly: false,
  ownerOnly: true,
  myServerOnly: false,
	aliases: ['stats','botinfo'],
	usage: ``,
	cooldown: 5,
	execute(client, message, args) {
  //command
  let cpuLol;
  cpuStat.usagePercent(function(err, percent, seconds) {
      if (err) {
          return console.log(err);
      }
      const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
      const botinfo = new Discord.MessageEmbed()
          .setAuthor(client.user.username)
          .setTitle("__**Stats:**__")
          .setColor("RANDOM")
          .addField("⏳ Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
          .addField("⌚️ Uptime ", `${duration}`, true)
          .addField("📁 Users", `${client.users.cache.size}`, true)
          .addField("📁 Servers", `${client.guilds.cache.size}`, true)
          .addField("📁 Channels ", `${client.channels.cache.size}`, true)
          .addField("👾 Discord.js", `v${version}`, true)
          .addField("🤖 Node", `${process.version}`, true)
          .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
          .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, true)
          .addField("🤖 Arch", `\`${os.arch()}\``, true)
          .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
          .addField("API Latency", `${(client.ws.ping)}ms`)  
      message.channel.send(botinfo)
  });
  }
  };*/
