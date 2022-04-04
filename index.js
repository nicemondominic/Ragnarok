const Discord = require("discord.js");
const client = new Discord.Client();
var package = require("./package.json");
var warns = require("./warns.json")
var config = require("./config.json");
var info = require("./info.json");
const fs = require("fs");
const prefix = config.prefix
const ytdl = require("ytdl-core")
const request = require("request")
let ownerida = 732210504075968582
let owneridb = '732210504075968582'



client.on("ready", () => {
  console.log('The time is ' + Date.now())
  console.log(`Ragnarok has started By nicemondominic!`)
  client.user.setGame(client.guilds.size + ' servers | ' + config.prefix + 'help')
});


client.on('message', message => {

    if (!message.guild) return;


    if (message.content.startsWith(prefix + 'kick')) {
        if(!message.member.hasPermission("KICK_MEMBERS")) return

      const user = message.mentions.users.first();

      if (user) {

        const member = message.guild.member(user);

        if (member) {

          member.kick('Optional reason that will display in the audit logs').then(() => {

            message.reply(`Successfully kicked ${member}`);
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
    }
  }); 
client.on("message", message => {
  let args = message.content.substring(prefix.length).split(" ");
  if (message.author.equals(client.user)) return;
  if (!message.content.startsWith(prefix)) return;

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
    case "math":
    message.channel.send('caluculating...')
    message.delete()
      var mathequal = eval(message.content.split(' ').slice(1).join(' '))
      message.channel.send('Your answer is ' + mathequal)
    break;
      case "dmuser":
      var config = require("./config.json")
      var dmuembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setDescription('You must provide a user and a message to send')
        .addField(config.prefix + 'dmuser <@user> <message>','<@user> = Mentioned User | <message> = message to send.')

        let message2send2user = message.content.split(/\s+/g).slice(2).join(" ")
        let user = message.guild.member(message.mentions.users.first())
        if(message2send2user.length < 1) return message.channel.send({embed: dmuembed}).catch(console.error);
        if(user.length < 1) return message.channel.send({embed: dmuembed}).catch(console.error);
        message.guild.member(user).sendMessage('A message from the user ' + message.author.toString() + ' has arrived!')
        message.guild.member(user).sendMessage(message2send2user)
        message.channel.send('Message sent to ' + user + ' successfully!')
        break;
    case "setstatus":
    var gameembed = new Discord.RichEmbed()
      .setColor('00FF00')
      .setDescription('You must provide a status *or game* for Ragnarok')
      .addField(prefix + 'setgame <game>','<game> = Can be anything really')

    let playgame = message.content.split(' ').slice(1).join(' ')
    if(playgame.length < 1) return message.channel.send({embed: gameembed}).catch(console.error);
        client.user.setGame(playgame)
        message.delete()
        message.channel.send('Set Status to ' + playgame)
      break;

    case "website":
      var websiteembed = new Discord.RichEmbed()
        .setColor('008080')
          .setTitle('Ragnarok Website')
            .setURL('https://cyanogen2004.github.io/personal/')
          message.channel.send({embed: websiteembed})

        break;
    case "devpage":
      var devpageembed = new Discord.RichEmbed()
        .setColor('008080')
        .setTitle('nicemondominic Dev Page')
        .setURL('https://cyanogen2004.github.io/personal/')
        message.channel.send({embed: devpageembed})
        break;
    case "feedback":
    var ciembed = new Discord.RichEmbed()
      .setColor(`00FF00`)
      .setDescription('You must provide an issue')
      .addField(prefix + 'feedback <issuereport>','<issuereport> = Your issue')

    let issuereport = message.content.split(' ').slice(1).join(' ')
    if(issuereport.length < 1) return message.channel.send({embed: ciembed}).catch(console.issue);
      console.log('Feedback: ' + issuereport + ' from ' + message.author.username + '.')
      
      message.channel.send(' Feedback Sent')
      message.channel.send('Thank you')
      break;
      
      case "fuck":
          message.channel.send('https://giphy.com/gifs/glee-image-wiki-wvQIqJyNBOCjK')
          message.delete()
          break;
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
        
      case "serverinfo":
        var serverinfembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Server Info')
        .addField('Server Name', message.guild.name)
        .addField('Server Owner', message.guild.owner)
        .addField('Server ID', message.guild.id)
        .addField('Server Region', 'India')
        .addField('Member Count', message.guild.memberCount)
        .addField('Online Member Count', message.guild.presences.filter(p=>p.status == 'online').size)
        .addField('Idle Member Count', message.guild.presences.filter(p=>p.status == 'idle').size)
        .addField('Do Not Disturb Count', message.guild.presences.filter(p=>p.status == 'dnd').size)
        .addField('Offline Member Count', `${message.guild.memberCount - message.guild.presences.filter(p=>p.status == 'online').size - message.guild.presences.filter(p=>p.status == 'idle').size - message.guild.presences.filter(p=>p.status == 'dnd').size} `)
        .addField('Channel Count', message.guild.channels.size)
        message.channel.send({embed: serverinfembed})
        break;
      case "serverid":
        var siembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .addField('Server ID', message.guild.id)
        message.channel.send({embed: siembed})
        break;
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
        .addField('Moderator', message.author.toString())
        .addField('Reason', reason)
        .addField('NB:', 'If You Repeat This Action,We Will Kick Your Ass')
        message.channel.send({embed: permerrorembed})
        break;

      case "dmadmin":
      var config = require("./config.json");
      var dmhembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setDescription('You must provide a message to send to Bot Admin')
        .addField(config.prefix + 'dmadmin <DM>','<DM> = Direct Message to send to nicemondominic')
      let message4hacker = message.content.split(' ').slice(1).join(' ')
      if(message4hacker.length < 1) return message.channel.send({embed: dmhembed}).catch(console.error);
        message.delete()
        client.users.get('732210504075968582').send('A message from the user ' + message.author.toString() + ' has arrived.')
        client.users.get('732210504075968582').send(message4hacker)
        break;
	             break;
  case "bornday":
    message.channel.send('The Bot RagnarokWas Created On 01/11/2021 and Admin Was Born On 01/11/2004. As You Wish, Give Him A Birthday Wish!☺️')
  break;
  case "botspeak":
      if(message.author.id === "732210504075968582") 

    if (message.content.toLowerCase().startsWith('>botspeak')){
       message.channel.send(message.content.replace('>botspeak', ''))
        message.delete()
    }
      break;

    case "purge":
      let purgeids = message.guild.roles.filter(r => r.name == 'Owner' || r.name == 'Co-Owner' || r.name == "Co Owner" || r.name == 'Admin' || r.name == 'Moderator' || r.name == 'Moderators' || r.name == 'Mods' || r.name == "Admins" || r.name == "Administrator").map(r => r.id);
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

      case "YT":
        message.channel.send('https://youtube.com/channel/UCP6pCHGt_tSpgl6RH2hPxZA')
        break;
   
      case "rules":
          message.channel.send("1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.")
          message.channel.send("2. A robot must obey orders given it by human beings except where such orders would conflict with the First Law.")
          message.channel.send("3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.")
          break;
      case "sourcecode":
      var scembed = new Discord.RichEmbed()
      .setColor('40E0D0')
      .setTitle('Bot Source Code')
      .setDescription('Here you can view and download the source code. NB:The SourceCode Didnt Synced Yet.')
      .setURL('https://github.com/nicemondominic/')
      message.channel.send({embed: scembed})
      break;
	  case "github":
		  var gembed = new Discord.RichEmbed()
		  .setColor('40E0d0')
		  .setTitle('Nicemon Dominic Github Page')
		  .setDescription('Here you can view the NMD github page.')
		  .setURL('https://github.com/nicemondominic/')
		  message.channel.send({embed: gembed})
            break;
            
            case "contact":
		  var gembed = new Discord.RichEmbed()
		  .setColor('40E0d0')
		  .setTitle('Contact @ Telegram')
		  .setDescription('My Telegram Id : mikkel2004')
		  message.channel.send({embed: gembed})
            break;
            
      case "invite":
      	message.channel.send('Here is the invite to my server requested by,' + message.author.toString() + ".")
    	var inembed = new Discord.RichEmbed()
    	.setColor('008080')
    	.setTitle('Invite to Cyanogen Server')
    	.setDescription('Cyanogen Is The Server Owned By nicemondominic.Join For Chilling!')
    	.setURL('https://discord.gg/Rt52mt42')
    	message.channel.send({embed: inembed})
    	break;
    
    case "botinvite":
    	message.channel.send("Here is an invite for Ragnarok requested by, " + message.author.toString() + ".")
    	var binvembed = new Discord.RichEmbed()
    	.setColor('40E0D0')
    	.setTitle('Ragnarok Invite')
    	.setURL('https://discord.com/api/oauth2/authorize?client_id=959805316952915998&permissions=8&scope=bot')
    	message.channel.send({embed: binvembed})
    	break;
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
    	.addField('Version', '1.1')
      .setThumbnail('https://picsum.photos/200')
      .setFooter("Version " + '1.1',"https://picsum.photos/200")
		message.channel.send({embed: infoembed})
    	break;
      case "help":
      let helpcommand = message.content.split(' ').slice(1).join(' ')
      var info = require("./info.json")
      var config = require("./config.json");
      var helpembed = new Discord.RichEmbed()
        .setColor('	#FFFFFF')
        .setTitle('Ragnarok Commands')
        .setDescription(config.prefix + 'help <command> To Get Help With All Commands Listed Here And Some Commands Are Cant Be Revealed ')
        .addField('**Information**','help | ping | info | uptime | serverinfo')
        .addField('**Bot Information**','`botinvite` `website` `musicwebsite` `sourcecode` `github` `suggestion` `consoleissue`')
        .addField('**Music**','`play` `skip` `pause` `queue` `end` `stop`')
        .addField('**Entertainment**','`say` `saytts` `8ball` `coinflip` `flip` `roll`')
        .addField('**Memes**','`rage` `error` `tableflip` `untableflip` `shrug` `notproductive` `bigorder`')
        .addField('**Moderation**','`ban` `unban` `kick` `purge` `channelcreate` `channeldelete` `setnick`')
        .addField('**Other**','`dmhacker` `dmuser` `devpage` `invite` `unixtime`')
        .addField('**WIP**','`warn` `mute`')


        var helpcembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Help Help')
        .setDescription('Get a list of commands available with Ragnarok')
        .addField(config.prefix + 'help <command>','<command> = command from help')
        var pingembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Ping Help')
          .setDescription('Test the bot\'s ping')
          .addField(config.prefix + 'ping <text|image>','<text|image> = ')
        var testembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Test Help')
          .setDescription('Test Command to see if HackerBot is working')
          .addField(config.prefix + 'test','This command has no arguments')
        var infoembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Info Help')
          .setDescription('Gives info on HackerBot')
          .addField(config.prefix + 'info','This command has no arguments')
        var uptimeembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Uptime Help')
          .setDescription('Gives total Uptime of HackerBot')
          .addField(config.prefix + 'uptime <timeformat>','<timeformat> = Seconds, Minutes, etc,...')
        var serverinfoembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Server Info Help')
          .setDescription('Gives info on the current server')
          .addField(config.prefix + 'severinfo','This command has no arguments')
        var botinviteembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Bot Invite Help')
          .setDescription('Sends an OAuth Invite for HackerBot')
          .addField(config.prefix + 'botinvite','This command has no arguments')
        var websiteembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Website Help')
          .setDescription('Sends a link to the nicemondominic Website')
          .addField(config.prefix + 'website','This command has no arguments')
        var musicwebsiteembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Music Website Help')
          .setDescription('Sends a link to the nicemondominic Music Website')
          .addField(config.prefix + 'musicwebsite','This command has no arguments')
        var sourcecodeembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Source Code Help')
          .setDescription('Sends a link to the nicemondominic Source')
          .addField(config.prefix + 'sourcecode','This command has no arguments')
        var githubembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('GitHub Help')
          .setDescription('Sends a link the Hnicemondominic GitHub Page')
          .addField(config.prefix + 'github','This command has no arguments')
        var suggestionembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Suggestion Help')
          .setDescription('Sends a link to the GitHub Issues Page')
          .addField(config.prefix + 'suggestion','This command has no arguments')
        var consoleissueembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Console Issue Help')
          .setDescription('Send a console issue report directly to the console')
          .addField(config.prefix + 'consoleissue <issuereport>','<issuereport> = Issue to report to the console')
        var sayembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle("Say Help")
          .setDescription('Say a message through HackerBot')
          .addField(config.prefix + 'say <message>','<message> = Message to say')
        var sayttsembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('SayTTS Help')
          .setDescription('Say a message through HackerBot with Text To Speech')
          .addField(config.prefix + 'saytts <ttsmessage>','<ttsmessage> = TTS Message to say')
        var eightballembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('8Ball Help')
          .setDescription('Ask the mystical 8Ball your :fire: burnining :fire: questions')
          .addField(config.prefix + '8ball <question>','<question> = Question to ask the mystical 8Ball')
        var coinflipembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Coinflip Help')
          .setDescription('Flip a coin; Heads or Tails')
          .addField(config.prefix + 'flip','This command has no arguments')
        var rollembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('RollDice Help')
          .setDescription('Roll the die *(or dice)*')
          .addField(config.prefix + 'roll','This command has no arguments')
        var rageembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Rage Help')
          .setDescription('Sends a Rage GIF')
          .addField(config.prefix + 'rage','This command has no agruments')
        var errorccembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Error Help')
          .setDescription('Sends an Error with the color provided')
          .addField(config.prefix + 'error <color>','<color> = Any color from the rainbow')
        var tableflipembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Table Flip Help')
          .setDescription('Sends a fipped table')
          .addField(config.prefix + 'tableflip','This command has no arguments')
        var untableflipembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('UnTable Flip Help')
          .setDescription('Sends a unflipped table')
          .addField(config.prefix + 'untableflip','This command has no arguments')
        var shrugembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Shrug Help')
          .setDescription('Sends a shrug')
          .addField(config.prefix + 'shrug','This command has no arguments')
        var notproductiveembed = new Discord.RichEmbed()
            .setColor('00FF00')
            .setTitle('Not Productive Help')
            .setDescription('A summary of what you did over the summer')
            .addField(config.prefix + 'notproductive','This command has no arguments')
        var bigorderembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Big Order Help')
          .setDescription('Big Smokes\'s Big Order')
          .addField(config.prefix + 'bigorder','This command has no arguments')
        var banembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Ban Help')
          .setDescription('Bans a User')
          .addField(config.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Ban')
        var purgeembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Purge Help')
          .setDescription('Deletes up to 100 Messages')
          .addField(config.prefix + 'purge <amount>','<amount> = amount of messages to purge')
        var kickembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Kick Help')
          .setDescription('Kick a user')
          .addField(config.prefix + 'kick <@user> <reason>','<@user> = @Mentioned User | <reason> = Reason for Kick')
        var channelcreateembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Channel Create Help')
          .setDescription('Create a channel')
          .addField(config.prefix + 'channelcreate <name>','<name> = Name for Channel Creation')
        var channeldelete = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Channel Delete Help')
          .setDescription('Delete a channel')
          .addField(config.prefix + 'channeldelete','This command has no arguments')
        var setnickembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Set Nick Help')
          .setDescription('Set the Nickname of a user or bot *(with the correct permissions)*')
          .addField(config.prefix + 'setnick <@user> <nickname>','<@user> = @Mentioned User ! <nickname> = Nickname to set for the user or bot')
        var dmuserembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('DMUser Help')
          .setDescription('DM a user through HackerBot; **This command does not work globally**')
          .addField(config.prefix + 'dmuser <@user> <message>','<@user> = @Mentioned User | <message> = Message to send to user')
        var dmhackerembed =  new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('DMHacker Help')
          .setDescription('DM TheHacker894')
          .addField(config.prefix + 'dmhacker <message>','<message> = Message to send to TheHacker894')
        var devpageembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Dev Page Help')
          .setDescription('Sends a link to TheHacker894 Dev Page')
          .addField(config.prefix + 'devpage','This command has no arguments')
        var inviteembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Invite Help')
          .setDescription('Sends an Invite Link to the HackerWorld Discord Server')
          .addField(config.prefix + 'invite','This command has no arguments')
        var unixtimeembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Unix Time Help')
          .setDescription('Sends the amount of ticks passed since 1/1/1970 on EDT')
          .addField(config.prefix + 'unixtime','This command has no arguments')

        if(helpcommand.length < 1) return message.channel.send({embed: helpembed})
        if(helpcommand === `help`) return message.channel.send({embed: helpcembed})
        
        break;
    case "advice":
    		message.channel.send('If you would like to submit a suggestion or concern visit one, or both, of the links below.')
    		message.channel.send('https://t.me/mikkel2004')
    		message.channel.send('https://github.com/nicemondominic/')
    		break;
    function rollyodice() {
      var rand = ['**1**','**2**','**3**','**4**','**5**','**6**']

    return rand[Math.floor(Math.random()*rand.length)];
  }
    case "roll":
    {
      message.channel.send(':game_die: **|** ' + rollyodice());
      break;
    }
    case "rolldice":
    {
      message.channel.send(':game_die: **|** ' + rollyodice());
      break;
    }
    function doMagic8BallVoodoo() {
    var rand = ['*It is certain*','*It is decidedly so*','*Without a doubt*','*Yes definitely*','*You may rely on it*','*As I see it, yes*','*Most likely*','*Outlook good*','*Yes*','*Signs point to yes*','*Reply hazy try again*','*Ask again later*','*Better not tell you now*','*Cannot predict now*','*Concentrate and ask again*','*Don\'t count on it*','*My reply is no*','*My sources say no*','*Outlook not so good*','*Very doubtful*'];

    return rand[Math.floor(Math.random()*rand.length)];
}

// Later in the code:
	case "8ball":
{
    var questionembed = new Discord.RichEmbed()
      .setColor('00FF00')
      .setDescription('You must provide a question to ask')
      .addField('>8ball <question>','<question> = Question for the 8Ball')

    let question = message.content.split(' ').slice(1).join(' ')
    if(question.length < 1) return message.channel.sendEmbed(questionembed).catch(console.error);
    console.log(message.guild.name + ' | ' + Date.now() + ' | ' + question + ' | ' + doMagic8BallVoodoo);
    message.channel.send(':8ball: ' + doMagic8BallVoodoo());
 		break;
}
	function coinflipping() {
	var rand = ['Heads!', 'Tails!', 'Heads!', 'Tails!','Heads!', 'Tails!','Heads!', 'Tails!',]
	return rand[Math.floor(Math.random()*rand.length)];
}

// Later in the code:
	case "coinflip":
{
    message.channel.send('We have, ' + coinflipping());
 		break;
}
  case "flip":
{
  message.channel.send('We have, ' + coinflipping());
  break;
}
case "kys":
  message.channel.send(':ok_hand: :joy: :gun:')
  break;
case "say":
var config = require("./config.json");
var sayembed = new Discord.RichEmbed()
.setColor('00FF00')
.setTitle('Say Usage')
.setDescription('You must provide a message to say')
.addField(config.prefix + 'say <message>','<message> = Message to say')

let message2say = message.content.split(' ').slice(1).join(' ')
if(message2say.length < 1) return message.channel.send({embed: sayembed}).catch(console.error);
    message.channel.send(message2say)
    message.delete()
          break;

          case "saytts":
          var config = require("./config.json");
          var sayttsembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('SayTTS Usage')
          .setDescription('You must provide a message to say using TTS')
          .addField(config.prefix + 'saytts <messagetts>',':x')

          let message2saytts = message.content.split(' ').slice(1).join(' ')
          if(message2saytts < 1) return message.channel.send({embed: sayttsembed}).catch(console.error);
          message.channel.send(message2saytts, {
        tts: true
        })
          message.delete()
        break;
    case "bigorder":
    	message.channel.send('I\’ll have two number 9\'s, a number 9 large, a number 6 with extra dip, a number 7, two number 4\'s, one with cheese, and a large soda.')
    	message.channel.sendFile('http://pre06.deviantart.net/62e6/th/pre/f/2017/010/3/9/theorder_by_lawlsomedude-dauzlib.png')
    	break;
    case "untableflip":
      message.channel.send('┬─┬﻿ ノ( ゜-゜ノ)')
      break;
    case "tableflip":
    	message.channel.send('(╯°□°）╯︵ ┻━┻ ')
    	message.channel.sendFile('https://media.giphy.com/media/uKT0MWezNGewE/giphy.gif')
    	break;
    case "dannyslife":
    	message.channel.send('Here is the biography about DannyBoi')
    	var dlembed = new Discord.RichEmbed()
    	.setColor('000000')
    	.setTitle('Danny\'s Life')
    	.setURL('https://drive.google.com/file/d/0B3AjZwDXKX8fY0RUVTZUV0RrNGs/view?usp=sharing')
    	message.channel.send({embed: dlembed})
    	break;
    case "pause":
      message.channel.send('`Sorry, but I do not support this feature at the moment, but you can invite HackerBot Music`')
      message.channel.send('https://discordapp.com/oauth2/authorize?client_id=365255372480446465&scope=bot&permissions=2146958591')
      break;
    case "rps":
    var config = require("./config.json");
    function botrock() {
        var rand = ['Rock','Paper','Scissors','Paper','Scissors','Paper','Scissors','Paper','Scissors','Paper','Scissors']
        return rand[Math.floor(Math.random()*rand.length)];
        }
        function botpaper() {
            var rand = ['Rock','Paper','Scissors','Rock','Scissors','Rock','Scissors','Rock','Scissors','Rock','Scissors']
            return rand[Math.floor(Math.random()*rand.length)];
            }
            function botscissors() {
                var rand = ['Rock','Paper','Scissors','Rock','Paper','Rock','Paper','Rock','Paper','Rock','Paper']
                return rand[Math.floor(Math.random()*rand.length)];
                }
    var rpsitemlengtherrorembed = new Discord.RichEmbed()
      .setTitle('RPS Usage')
      .setColor('00FF00')
      .setDescription('Please provide an item to *through*')
      .addField(config.prefix + 'rps <rock|paper|scissors>','<rock|paper|scissors> = Rock, Paper, or Scissors')

    let rpsitem = message.content.split(' ').slice(1).join(' ')
      if(rpsitem === "rock") return message.channel.send('I choose...').then(sent => {sent.edit(botrock())}).catch(console.error);
      if(rpsitem === "paper") return message.channel.send('I choose...').then(sent => {sent.edit(botpaper())}).catch(console.error);
      if(rpsitem === "scissors") return message.channel.send('I choose...').then(sent => {sent.edit(botscissors())}).catch(console.error);
      if(rpsitem === "scissor") return message.channel.send('I choose...').then(sent => {sent.edit(botscissors())}).catch(console.error);
      if(rpsitem === "gun") return message.channel.send('>:(').then(sent => {sent.edit(message.author.toString() + ' :gun:')})
      if(rpsitem.length < 1) return message.channel.send({embed: rpsitemlengtherrorembed})
      break;
  //   default:
  //    message.channel.send(" :x: **ERROR 404 COMMAND NOT FOUND** :x: ")
    //  break;

  }
});
client.login(config.token)
