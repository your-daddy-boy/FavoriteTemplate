const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
	name: 'Restart',
	description: 'Reset system',
  guildOnly: false,
  ownerOnly: true,
  myServerOnly: false,
	aliases: ['restart','reset','mati'],
	usage: ``,
	cooldown: 5,
	execute(client, message, args) {
  var newmsg = args.join(" ");
  message.delete().catch()
  message.react("✅");
  
  
   if(message.author.id !== '701546426135740426' ) return message.channel.send({ embed: {
      description: "⛔ **ACCESS DENIED**"
     
    }});
  message.channel.send({ embed:  { description: "**System Restarted**" }}).then(() => {
    process.exit(1);
  })
} 

}
