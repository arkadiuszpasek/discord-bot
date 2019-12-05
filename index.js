const config = require('./config.json');
const bot = require('./BotFunctions.js');

const Discord = require('discord.js');
const client = new Discord.Client();

const stdin = process.stdin;
stdin.setEncoding('utf-8');

let isReady = false;
let channelConnection;
let channel;
let dispatcher;

let fileMap = bot.loadFileList();

console.log('Connecting...');

client.once('ready', () => {
    console.log('Connected');
    isReady = true;
});

// client.on('message', message => {
// });

stdin.on('data', async data => {
    if(!isReady) return;

    const re = /^bot/;
    if(!re.test(data)) return;

    data = data.replace(re, '').trim();
    console.log(data);

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
            fileMap.forEach((file, number) => console.log(`${number}-${file}`));
            break;
        case 'load':
            fileMap = bot.loadFileList();
            break;
        case 'stop':
        case 'end':
            if(!dispatcher) return;
            dispatcher.end();
            break;
        case 'exit':
            process.exit();
    }
    if(data.startsWith('play')) {
        if(!new RegExp('^play:.+').test(data)) {
            console.log('Incorrect usage <play>:<number>');
            return;
        }

        dispatcher = bot.playSound(channel, channelConnection, parseInt(data.split(':')[1]), fileMap);
    }

});

client.login(config.token);