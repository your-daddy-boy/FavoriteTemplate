const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js");



module.exports = {
	name: 'Ping',
	description: 'Network info',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['ping','peng','pong','pung'],
	usage: ``,
	cooldown: 5,
	execute(client, message, args) {
  
  let start = Date.now();
    //message.channel.send(`https://cdn.discordapp.com/emojis/723096907769184298.gif?v=1`).then(message => {
  // message.delete({timeout: 2000})
    let diff = (Date.now() - start).toLocaleString();
    let API = client.ws.ping.toFixed();
    let embed = new Discord.MessageEmbed()
      .setAuthor("Network", client.user.displayAvatarURL({format: 'png', dynamic: true})+"?size=2048")
      .setColor('GREEN')
      //.setFooter(`Development`)
       //.addField("Latency", `${diff}ms`, true)
      //.setThumbnail(`https://cdn.discordapp.com/attachments/779193156859330560/779443134957748294/present.jpg`)
      .setTimestamp()
      .addField("API", `${API}ms`, true);
      
       message.channel.send(embed);
    
   //   });
    }
  }
