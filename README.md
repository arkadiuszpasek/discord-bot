# Discord Bot
CLI Bot implementing music interface (playing music files from specified directory)

# Prerequisites
- FFMPEG installed and added to $PATH
# How to run it
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
## npm dependencies installed:
- discord.js
- ffmpeg
- node-opus
- eslint (devDependency)
