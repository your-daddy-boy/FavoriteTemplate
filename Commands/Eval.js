const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

module.exports = {
	name: 'Eval',
	description: 'Evaling', 
	aliases: ['eval'],
	usage: `eval <arg>`,
	cooldown: 1,
	async execute(client, message, args) { 
    const authors = ["378960892508897281","701546426135740426"];
    let AIR = new MessageEmbed()       
    .setTitle('Not my Dev')
    if(!authors.includes(message.author.id)) return message.channel.send(AIR);
    //if (message.author.id !== '701546426135740426') return message.channel.send('NOOB');
    //if (message.author.id !== '722604437243297812') return message.channel.send('NOOB');
    args = args.join(" ");
    try {
        
        var evaled = eval(args);
        if (typeof evaled !== 'string')
       
        
          
        evaled = require('util').inspect(evaled);
      
      
      let aoiu = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setAuthor('Eval Successfully','https://cdn.discordapp.com/emojis/788366425236570143.gif?v=1')
      .addField('Input',`\`\`\`css\n${args}\n\`\`\``)
      .addField('Output',`\`\`\`js\n${clean(evaled)}\n\`\`\``)
      
        message.channel.send(aoiu)
        await message.react("✅")
   
           
    } catch (err) {
      
      let aoi = new Discord.MessageEmbed()
      .setColor('RED')
      .setAuthor('Eval Failed','https://cdn.discordapp.com/emojis/776045946986430474.gif?v=1')
      .addField('Input',`\`\`\`css\n${args}\n\`\`\``)
      .addField('Output',`\`\`\`js\n${clean(err)}\n\`\`\``)
       
        message.channel.send(aoi);
        await message.react("⛔")
    }
}

}
