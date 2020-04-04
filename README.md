# Discord Bot
CLI Bot implementing music interface (playing music files from specified directory)

# Prerequisites
- FFMPEG installed and added to $PATH
# Configuration
- Clone this project
- Run `npm install`
- create `config.json` file in main directory, with a structure

```
{
  "token": "a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0",
  "userId": "010101001010101001",
  "soundsLocation" : "C:/sounds/" <- example path
}
```
Here you need to 
- add your application token: go to [DiscordApp Developers](https://discordapp.com/developers), find application you want to use (or make a new one), in 'bot' tab find the token and paste it to your `config.json`
- Change userId to your discord user id (this makes bot able to search and come to a channel you are currently in)

# How to run it
- Run `npm sart ` or `node index.js`, you should see 'Connected' output in console
- Now you can use commands `bot command`, for example: `bot help`,

## Commands implemented
- `bot help` - display help  
- `bot come` - search for user with config.userId and join his channel  
- `bot list` - list all filed in specified sounds directory
- `bot play:number` - play specified file, usually used after `bot list`
- `bot reload` - if you changed files in sounds directory while the app was running 
- `bot exit` - if you changed files in sounds directory while the app was running 
## npm dependencies installed:
- discord.js
- ffmpeg
- node-opus
- eslint (devDependency)
