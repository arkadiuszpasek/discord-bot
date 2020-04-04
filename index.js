const Discord = require('discord.js');
const config = require('./config.json');
const bot = require('./BotFunctions.js');

const client = new Discord.Client();

let channel;
let dispatcher;
let isReady = false;
let channelConnection;

let filesMap = bot.loadFileList();

process.stdin.setEncoding('utf-8');
console.log('Connecting...');

client.once('ready', () => {
    console.log('Connected');
    isReady = true;
});

client.on('message', message => {
    if(!message.content.startsWith('#') || message.author.id != config.userId) return;

    const msg = message.content.substring(1);

    switch (msg) {
        case 'list':
            message.channel.send(bot.stringifyList(filesMap));
            break;
        case 'reload':
            filesMap = bot.loadFileList();
            break;
        case 'stop':
        case 'end':
            if(!dispatcher) return;

            dispatcher.end();
            break;
    }
    if(msg.startsWith('play')) {
        if(!new RegExp('^play:.+').test(msg)) {
            message.channel.send('Incorrect usage <play>:<number>');
            return;
        }

        dispatcher = bot.playSound(channel, channelConnection, parseInt(msg.split(':')[1]), filesMap);
    }
});

process.stdin.on('data', async data => {
    if(!isReady) return;

    const re = /^bot/;
    if(!re.test(data)) return;

    data = data.replace(re, '').trim();

    switch (data) {
        case 'leave':
            channel.leave();
            channel = undefined;
            break;
        case 'come':
            channel = bot.findChannel(client);
            if(channel) channelConnection = await bot.joinChannel(channel);
            break;
        case 'list':
            filesMap.forEach((file, number) => console.log(`${number}-${file}`));
            break;
        case 'reload':
            filesMap = bot.loadFileList();
            break;
        case 'stop':
        case 'end':
            if(!dispatcher) return;
            dispatcher.end();
            break;
        case 'help':
            console.log('bot leave|come|list|reload|stop|end|exit|play:x|');
            break;
        case 'exit':
            process.exit();
    }

    if(data.startsWith('play')) {
        if(!new RegExp('^play:.+').test(data)) {
            console.log('Incorrect usage <play>:<number>');
            return;
        }

        dispatcher = bot.playSound(channel, channelConnection, parseInt(data.split(':')[1]), filesMap);
    }
});

client.login(config.token);