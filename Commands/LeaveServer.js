const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
	name: 'Exit',
	description: 'Quit the server',
  guildOnly: false,
  ownerOnly: true,
  myServerOnly: false,
	aliases: ['exit'],
	usage: ``,
	cooldown: 5,
	execute(client, message, args) {
    
    const authors = ["378960892508897281","701546426135740426"];
    let AIR = new MessageEmbed()       
    .setTitle('Not my Dev')
    if(!authors.includes(message.author.id)) return message.channel.send(AIR);
    try {

        message.delete();
        message.guild.leave();

    } catch(e) {
//Commands/LeaveServer.js
        console.log(e.stack);

    }
}

}
