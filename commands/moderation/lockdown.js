module.exports = {
  name: "lockdown",
  category: "moderation",
  aliases: ["lock"],
  usage: "-lockdown",
  run: (client, message, args) => {
  if (!client.lockit) client.lockit = [];
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply('Bro you not have permission')
  
  message.channel.createOverwrite(message.guild.id, {
    SEND_MESSAGES: false 
  })
  message.channel.send('Channel Has ben locked down')
}}