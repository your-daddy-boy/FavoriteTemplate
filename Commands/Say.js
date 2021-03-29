const Discord = require("discord.js");
module.exports = {
	name: 'Say',
	description: 'Repeat text',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['say'],
	usage: "say <text>",
	cooldown: 2,
	execute(client, message, args) {
    
     if (!message.member.hasPermission('ADMINISTRATOR') || !message.author.id === '701546426135740426') return message.channel.send("Only administrator can do this Command");
      
       {
  
        var newmsg = args.join(" ");
        message.delete().catch();
        //message.channel.send(args.join(" ")).cleanContent;
    }
      message.channel.send(newmsg)
 }


}
