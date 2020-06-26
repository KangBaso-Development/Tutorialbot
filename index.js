const Discord = require('discord.js')
const { config } = require('dotenv')
const client = new Discord.Client()

const prefix = '-';
const ownerID = '698069399285792848';

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command"].forEach(handler => { 
  require(`./handlers/${handler}`)(client)
})
      
client.on('ready', () => {
  client.user.setStatus("dnd");
  client.user.setActivity(`Kang Baso Development | -help`, {
    type: "WATCHING"
  })
  console.log(`[READY] ${client.user.tag} ready to serve ${client.users.cache.size} at ${client.guilds.cache.size} servers.`);
})
client.on('message', message => {

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix is \`${prefix}\``);
  }
  
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();
  
  
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  
  if (cmd.lenght === 0) return
  
  try {
    
    let ops = {
      ownerID: ownerID
    }
    
        let command = client.commands.get(cmd)
        if (!command) command = client.commands.get(client.aliases.get(cmd))
    if (command)
    command.run(client, message, args, ops);
    
    
  } catch (e) {
    
  }
});


client.login(process.env.TOKEN);