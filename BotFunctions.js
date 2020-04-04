const Discord = require('discord.js');
const fs = require('fs');

const config = require('./config.json');

exports.playSound = (_channel, _channelConnection, number, fileMap) => {
    if(_channel == undefined || _channelConnection == undefined) {
        console.log('Cannot play anything: Undefined!');
        return;
    }
    const file = fileMap.get(number);
    if(file == undefined) {
        console.log('Didn\'t read any file');
        return;
    }

    console.log(`Playing : ${file}...`);
    const dispatcher = _channelConnection.playFile(config.soundsLocation + file);
    dispatcher.on('end', () => {
        console.log('Playing finished');
    });

    return dispatcher;
};

// eslint-disable-next-line no-unused-vars
exports.findChannel = botClient => {
    return botClient.channels.find(channel => {
        if(!(channel instanceof Discord.VoiceChannel) || channel.members == undefined) return false;

        return channel.members.get(config.userId) !== undefined;
    });
};

exports.joinChannel = async channel => {
    try{
        const _connection = await channel.join();
        console.log('Joined channel');
        return _connection;
    }
    catch(e) {
        console.log(e);
    }
};

exports.loadFileList = () => {
    const fileMap = new Map();
    fs.readdir(config.soundsLocation, (err, files) => {
        if(err) throw err;

        files.forEach(file => {
            fileMap.set(fileMap.size, file);
        });
    });
    console.log('Files loaded successfully');
    return fileMap;
};

exports.stringifyList = map => {
    let returnString = '';
    map.forEach((file, number) => returnString += `${number}-${file}\n`);
    return returnString;
};