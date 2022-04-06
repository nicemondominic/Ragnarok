const Discord = require("discord.js");
const client = new Discord.Client();
var package = require("./package.json");
var config = require("./config.json");
var info = require("./info.json");
const fs = require("fs");
const prefix = config.prefix
const ownerid = config.ownerid
const request = require("request")

//for saving the logs in debug.log file
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'a'});
var log_stdout = process.stdout;
var util = require('util');

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};


client.on("ready", () => {
  console.log('The time is ' + Date())
  console.log(`Ragnarok has started By nicemondominic!`)
    //default activity
  client.user.setActivity(client.guilds.size + ' servers | ' + config.prefix + 'help')
});



client.on("message", message => {
  let args = message.content.substring(prefix.length).split(" ");
  if (message.author.equals(client.user)) return;
  if (!message.content.startsWith(prefix)) return;

    //check the ping of the bot
  switch (args[0].toLowerCase()) {
        case "imageping":
          message.channel.send('Pinging...').then(sent => {
            sent.edit('http://madeformakers.org/wp-content/uploads/2016/01/pong.png').then(msg => {
              msg.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`);
              console.log('Image Ping performed on ' + message.guild.name + ` took ${sent.createdTimestamp - message.createdTimestamp}ms`)
            })
          })
          message.delete()
      break;
          //to do mathematical calculations with bot
    case "math":
    message.channel.send('calculating...')
    message.delete()
      var mathequal = eval(message.content.split(' ').slice(1).join(' '))
      message.channel.send('Your answer is ' + mathequal)
    break;
          //admin can only use kick command
    case "kick":
                if(!message.member.hasPermission("KICK_MEMBERS")) return

      const userkick = message.mentions.users.first();

      if (userkick) {

        const member = message.guild.member(userkick);

        if (member) {

          member.kick('Optional reason that will display in the audit logs').then(() => {

            message.reply(`Successfully kicked ${member}`);
              console.log(`${member} ` + 'kicked by ' + message.author.username.toString() + ' on '+ Date())
          }).catch(err => {

            message.reply('I was unable to kick the member');

            console.error(err);
          });
        } else {

          message.reply('That user isn\'t in this guild!');
        }

      } else {
        message.reply('You didn\'t mention the user to kick!');
      }
        break;
          //ban user,admin only command
        case "ban":
     let member = message.mentions.members.first();
    member.ban().then((member) => {
        message.channel.send(`:wave: ${member.displayName} has been kicked`);
        console.log(`${member.displayName} ` + 'banned by ' + message.author.username.toString() + ' on '+ Date())
    }).catch(() => {
        if (!message.member.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR'])) {
            message.reply("You cannot ban members");
        } else if (member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR'])) {
            message.reply("You cannont ban this member");
        }
    })
            break;
          //for remove ban
            case "unban":
                message.guild.fetchBans().then(bans => {
            bans.forEach(user => {
                console.log(user.username + '#' + user.tag);
                user.send('MESSAGE / INVITE LINK');
                message.guild.unban(user);
                message.channel.send('User Unbanned')
            });
        });
                break;
           //owner can send message to user thorugh bot
      case "dmuser":
      var config = require("./config.json")
      var dmuembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setDescription('You must provide a user and a message to send')
        .addField(prefix + 'dmuser <message.author.id> <message>','<@user> = Mentioned User | <message> = message to send.')
        message.delete()

        let message2send2user = message.content.split(/\s+/g).slice(2).join(" ")
        let user = message.guild.member(message.mentions.users.first())
        if(message2send2user.length < 1) return message.channel.send({embed: dmuembed}).catch(console.error);
        if(user.length < 1) return message.channel.send({embed: dmuembed}).catch(console.error);
        if(message.author.id === ownerid) {
        message.guild.member(user).sendMessage('A message from the Admin ' + message.author.username.toString() + ' has arrived!')
        message.guild.member(user).sendMessage(message2send2user)
        message.channel.send('Message sent to ' + user + ' successfully!')
        }
        break;
          //owner can set activity
    case "setstatus":
    var gameembed = new Discord.RichEmbed()
      .setColor('00FF00')
      .setDescription('You must provide a status *or game* for Ragnarok')
      .addField(prefix + 'setgame <game>','<game> = Can be anything really')

    let newactivity = message.content.split(' ').slice(1).join(' ')
    if(newactivity.length < 1) return message.channel.send({embed: gameembed}).catch(console.error);
    message.delete()
    if(message.author.id === ownerid)
        client.user.setGame(newactivity)
        message.channel.send('Set Status to ' + newactivity)
        console.log('status set to ' + newactivity + 'by ' + message.author.username.toString() + ' on '+ Date())
      break;
          //developer website
 //   case "devpage":
//      var devpageembed = new Discord.RichEmbed()
       // .setColor('008080')
 //       .setTitle('nicemondominic Page')
 //       .setURL('Your_Website')
        message.channel.send({embed: devpageembed})
        break;
          //sending feedback to console..saved in debug.log
    case "feedback":
    var ciembed = new Discord.RichEmbed()
      .setColor(`00FF00`)
      .setDescription('You must provide an issue')
      .addField(prefix + 'feedback <issuereport>','<issuereport> = Your issue')

    let issuereport = message.content.split(' ').slice(1).join(' ')
    if(issuereport.length < 1) return message.channel.send({embed: ciembed}).catch(console.issue);
      console.log('Feedback: ' + issuereport + ' from ' + message.author.username + '.' + ' on ' + Date())
      
      message.channel.send(' Feedback Sent')
      message.channel.send('Thank you')
      break;
      //sending giphy
      case "suicide":
          message.channel.send('https://giphy.com/gifs/glee-image-wiki-wvQIqJyNBOCjK')
          message.delete()
          break;
      case "heii":
          message.channel.send('https://giphy.com/gifs/cat-hug-phone-0OgdJVNjbcIifqSb7U')
          message.delete()
          break;
      case "idiot":          message.channel.send('https://media.giphy.com/media/uJEeuiZvNTPeo/giphy.gif')
          message.delete()
          break;
           case "fooding":          message.channel.send('https://media.giphy.com/media/PhvQ0pSu9MgLe/giphy.gif')
          message.delete()
          break;
           case "goodnight":          message.channel.send('https://media.giphy.com/media/LmgFqlSj5uZ1PCUaFR/giphy.gif')
          message.delete()
          break;
           case "busy":          message.channel.send('https://media.giphy.com/media/w0CPP48tkM6Ag/giphy.gif')
          message.delete()
          break;
       //   case "command":         
 //message.channel.send('giphy_url')
        //  message.delete()
      //    break;
          //bot uptime
          case "uptime":
        let seconds = client.uptime / 1000 + ' seconds'
        let minutes = client.uptime / 60000 + ' minutes'
        let hours = client.uptime / 3600000 + ' hours'
        let days = client.uptime / 86400000 + ' days'
        let uptimeformat = message.content.split(' ').slice(1).join(' ')

        var uptimeembed = new Discord.RichEmbed()
        .setColor(`00FF00`)
        .setTitle('Ragnarok Uptime')
        .addField('Uptime Seconds', seconds)
        .addField('Uptime Minutes', minutes)
        .addField('Uptime Hours', hours)
        .addField('Uptime Days', days)

        var secondupembed = new Discord.RichEmbed()
        .setColor(`00FF00`)
        .setTitle('Ragnarok Uptime (Seconds)')
        .addField('Uptime Seconds', seconds)

        var minuteupembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Ragnarok Uptime (Minutes)')
        .addField('Uptime Minutes', minutes)

        var hourupembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Ragnarok Uptime (Hours)')
        .addField('Uptime Hours', hours)

        var dayupembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Ragnarok Uptime (Days)')
        .addField('Uptime Days', days)
        if(uptimeformat === 'seconds') return message.channel.send({embed: secondupembed})
        if(uptimeformat === 'minutes') return message.channel.send({embed: minuteupembed})
        if(uptimeformat === 'hours') return message.channel.send({embed: hourupembed})
        if(uptimeformat === 'days') return message.channel.send({embed: dayupembed})
        if(uptimeformat.length < 1) return message.channel.send({embed: uptimeembed})


        break;
        //for getting server info
      case "serverinfo":
        var serverinfembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Server Info')
        .addField('Server Name', message.guild.name)
        .addField('Server Owner', message.guild.owner)
        .addField('Server ID', message.guild.id)
        //you can change server region here
        .addField('Server Region', 'India')
        .addField('Member Count', message.guild.memberCount)
        .addField('Online Member Count', message.guild.presences.filter(p=>p.status == 'online').size)
        .addField('Idle Member Count', message.guild.presences.filter(p=>p.status == 'idle').size)
        .addField('Do Not Disturb Count', message.guild.presences.filter(p=>p.status == 'dnd').size)
        .addField('Offline Member Count', `${message.guild.memberCount - message.guild.presences.filter(p=>p.status == 'online').size - message.guild.presences.filter(p=>p.status == 'idle').size - message.guild.presences.filter(p=>p.status == 'dnd').size} `)
        .addField('Channel Count', message.guild.channels.size)
        message.channel.send({embed: serverinfembed})
        break;
          //for gettting serverid
      case "serverid":
        var siembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .addField(message.guild.name , message.guild.id)
        message.channel.send({embed: siembed})
        break;
          //for warning user
      case "warn":
      var config = require("./config.json");
      var warnembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setDescription('You must supply a reason and a mentioned user.')
        .addField(config.prefix + 'warn <@user> <reason>','<@user> = @Mentioned User | <reason> = Reason for warn')

      let reason = message.content.split(/\s+/g).slice(2).join(" ");
      let usertowarn = message.guild.member(message.mentions.users.first());
      console.log(reason);
        if(reason.length < 1) return message.channel.send({embed: warnembed})
        if(message.mentions.users.size < 1) return message.channel.send({embed: warnembed}).catch(console.error);

        var permerrorembed = new Discord.RichEmbed()
        .setColor(00000)
        .addField('Action','Warning')
        .addField('User:', usertowarn)
        .addField('Owner', message.author.toString())
        .addField('Reason', reason)
        .addField('NB:', 'If You Repeat This Action,We Will Kick Your Ass')
       if(message.author.id === ownerid) {
        message.channel.send({embed: permerrorembed})
           console.log(message.author.username.toString() + ' Warned' + usertowarn + ' on ' + Date())
}
        break;
          //user can send message to admin through bot using this command

      case "dmadmin":
      var config = require("./config.json");
      var dmhembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setDescription('You must provide a message to send to Bot Admin')
        .addField(config.prefix + 'dmadmin <DM>','<DM> = Direct Message to send to nicemondominic')
      let message4admin = message.content.split(' ').slice(1).join(' ')
      if(message4admin.length < 1) return message.channel.send({embed: dmhembed}).catch(console.error);
        message.delete()
        client.users.get('732210504075968582').send('A message from the user ' + message.author.username.toString() + ' has arrived.')
        client.users.get('732210504075968582').send(message4admin)
        break;
	             break;
          //just a shit command..
  case "bornday":
    message.channel.send('The Bot RagnarokWas Created On 01/11/2021 and Admin Was Born On 01/11/2004. As You Wish, Give Him A Birthday Wish!☺️')
  break;
  case "botspeak":
      if(message.author.id === ownerid)

    if (message.content.toLowerCase().startsWith('$botspeak')){
       message.channel.send(message.content.replace('$botspeak', ''))
        message.delete()
    }
      break;
//for deleting messages
    case "purge":
      let purgeids = message.guild.roles.filter(r => r.name == 'Owner'|| r.name == "Co Owner" || r.name == 'Admin' || r.name == 'Moderator' || r.name == 'Moderators' || r.name == "Admins" || r.name == "Administrator").map(r => r.id);
      let isStaffspurge = false;
        for (const id of purgeids) {
          if (message.member.roles.has(id)) {
            isStaffspurge = true;
            break;
          }
        }
        if (isStaffspurge) {
          var config = require("./config.json");
          var lengthtoosmall = new Discord.RichEmbed()
            .setColor('00FF00')
            .setDescription('You must provide a number of message to purge; 1 - 100')
            .addField(config.prefix + 'purge <amount>','<amount> = Messages to purge')

          var lengthtoobig = new Discord.RichEmbed()
            .setColor('00FF00')
            .setDescription('The amount of messages to purge cannot be greater than 100')
            .addField(config.prefix + 'purge <amount>','<amount> = Messages to purge (cannot be greater than 100)')

          let purgearg = message.content.split(' ').slice(1).join(' ')
          if(purgearg.length < 1) return message.channel.send({embed: lengthtoosmall}).catch(console.error);
          if(purgearg.length > 100) return message.channel.send({embed: lengthtoobig}).catch(console.error);
          message.delete()
          message.guild.member(message.channel.bulkDelete(purgearg))
    } else {
      var config = require("./config.json");
      var permembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setDescription('Your role must be named Owner, Admin, or Co-Owner for this command')
        .addField(config.prefix + 'purge <amount>','<amount> = Messages to purge')

      return message.channel.send({embed: permembed});
    }
    break;
//YouTube channel link
      case "yt":
          var ytembed = new Discord.RichEmbed()
        .setColor('008080')
        .setTitle('YouTubeChannel')
        .setURL('yt_channel_link')
        message.channel.send({embed: ytembed})
        break;
   //setting rules for servers
      case "rules":
          message.channel.send("1. A Be respectful, civil, and welcoming.")
          message.channel.send("2. No inappropriate or unsafe content.")
          message.channel.send("3. Do not buy/sell/trade/give away anything.")
          message.channel.send("4. The primary language of this server is English.")
          message.channel.send("5. Spamming in any form is not allowed.")
          break;
          //getting code of bot
      case "sourcecode":
      var scembed = new Discord.RichEmbed()
      .setColor('40E0D0')
      .setTitle('Bot Source Code')
      .setDescription('Here you can view and download the source code of Ragnarok Bot. ')
      .setURL('https://github.com/nicemondominic/Ragnarok/')
      message.channel.send({embed: scembed})
      break;
          //invite to nicemondominic server

      case "invite":
      	message.channel.send('Here is the invite to my server requested by,' + message.author.toString() + ".")
    	var inembed = new Discord.RichEmbed()
    	.setColor('008080')
    	.setTitle('Invite to Ragnarok Server')
    	.setDescription('Ragnarok Is The Server Owned By nicemondominic . Join For Chilling!')
    	.setURL('https://discord.gg/Rt52mt42')
    	message.channel.send({embed: inembed})
    	break;
    //add bot to servers
   // case "botinvite":
    //	message.channel.send("Here is an invite for Ragnarok requested by, " + message.author.toString() + ".")
    //	var binvembed = new Discord.RichEmbed()
    //	.setColor('40E0D0')
    //	.setTitle('Ragnarok Invite')
    //	.setURL('bot_authorise_link')
    //	message.channel.send({embed: binvembed})
    //	break;
          
          //getting info of bot
    case "info":

    var info = require("./info.json");
	var config = require("./config.json");
    	var infoembed = new Discord.RichEmbed()
    	.setColor("ffff00")
    	.setTitle('Ragnarok Info')
    	.addField('Owner', config.owner)
      .addField('Language', 'English')
      .addField('Description', config.description)
      .addField('Uptime', client.uptime / 1000 + 's')
      .addField('Servers', client.guilds.size)
      	.addField('Helpers', '@APPUKUTTAN</>', false)
      	.addField('Contact','Telegram : https://t.me/nicemondominic')
        .addField('Github','https://github.com/nicemondominic/')
      .setThumbnail('https://media.giphy.com/media/qWoubkSvQxN1C/giphy.gif')
		message.channel.send({embed: infoembed})
    	break;
          //help commands
      case "help":
      let helpcommand = message.content.split(' ').slice(1).join(' ')
      var info = require("./info.json")
      var config = require("./config.json");
      var helpembed = new Discord.RichEmbed()
        .setColor('	#FFFFFF')
        .setTitle('Ragnarok Commands')
        .setDescription(config.prefix + 'List Of The Command Of Ragnarok And VIP Commands Only Used By Creator ')
        .addField('**Information**','help | info | uptime | serverinfo | serverid | rules')
        .addField('**Bot Information**',' sourcecode | bornday | feedback ')
        .addField('**GIPHY**',' suicide | heii | idiot | fooding | goodnight | busy')
        .addField('**Tools**','imageping | math | ')
        .addField('**Dev Info**','dmadmin | invite | yt')
        .addField('**Admin Only**','purge | kick | ban | unban')
        .addField('**VIP**','botspeak | dmuser | setstatus | warn')
      
             var helpcembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Help Help')
        .setDescription('Get a list of commands available with Ragnarok')
        .addField(config.prefix + 'help <command>','<command> = command from help')
        
        if(helpcommand.length < 1) return message.channel.send({embed: helpembed})
        if(helpcommand === `help`) return message.channel.send({embed: helpcembed})
    
  }
});
client.login(config.token)
ig.token)
gin(config.token)
