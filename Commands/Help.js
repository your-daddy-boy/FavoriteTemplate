const { prefix } = require('../Database.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'Help',
	description: 'List all of my commands or info about a specific command.',
  guildOnly: false,
  myServerOnly: false,
	aliases: ['commands', 'help'],
	usage: `help [Optional Command Name]`,
	cooldown: 5,
	async execute(client, message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
     let helpEmbed1 = new MessageEmbed()
		.setAuthor(client.user.username)
    
    .setDescription("Commands State\nIf you want to get information about our commands, you can try to find with `Help_Cmdname`. For example `Help Ping`")
    .addFields(
                
                {
                    name: "Collection",
                    value: "`Emoji` `Channelinfo` `Stats` `Serverinfo` `Ping` `User` `Snipe` `Avatar`",
                    inline: false
                },
                {
                    name: "Feature",
                    value: "`Join` `Leave` `Loop` `Play` `Skip` `Volume` `Lyrics` `Queue` `Clear` `Jump` `Pause` `Resume`",
                    inline: false
                },
                {
                    name: "Mod",
                    value: "`Addemoji` `Inrole` `Purge` `Embed` `Say`",
                    inline: false
                
                
                }
    )
    .setColor('2c2f33')
    //.setFooter("Matchatella x Asep")
    
    message.channel.send(helpEmbed1)
		}
if(!args[0]){
  return false;
} 
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`• **Name:** ${command.name}`);

		if (command.aliases) data.push(`• **Aliases:** ${command.aliases.join(', ')}`);
    
    
		if (command.description) data.push(`• **Description:** ${command.description}`);
    
    
		if (command.usage) data.push(`• **Usage:** ${command.usage}`);
  
    if(command.ownerOnly) {
      data.push(`• **Everyone:** No`) 
    } else {
data.push(`• **Everyone:** Yes`)
    }
    
    if(command.myServerOnly){ 
    data.push(`• **Specific Server **: Yes`)
} else {
  data.push(`• **Specific Server**: No`)
}
    
if (command.guildOnly){
  data.push(`• **Specific Guild**: Yes`)
} else {
  data.push(`• **Specific Guild**: No`)
}
 		data.push(`• **Cooldown:** ${command.cooldown || 3} second(s)`);
    let kid = new MessageEmbed()
    .setTitle(`About ${command.name}`)
    .setColor('GREEN')
    .setDescription(data, { split: true })
    const msg = await message.channel.send(kid)
    msg.react("<:ReoneTrue:808285174046916618>")
	},
};
