# Riad-Salemeh-TS
Riad Salemeh TS is a Discord Bot built using Typescript

It allows users to monitor the LBP to USD rate by Webscraping

The Website used as a source is www.lbprate.com



If you want to invite the bot to your server [Click here](https://discord.com/api/oauth2/authorize?client_id=826815896718540850&permissions=2147535872&scope=bot%20applications.commands) 

## Compiling
To run the bot you must first compile the Typescript version to Javascript, you must have pnpm installed. It can be installed [here](https://pnpm.io/installation)

Once you have pnpm installed, you have to install the required dependencies, the pnpm script will compile Typescript to Javascript automatically as a post-install procedure:
```bash
pnpm install
```

After installing the dependencies, you should see a new folder called "prod"

## Usage
You must create a .ENV file in the same folder as your pnpm-lock.yaml

To run the bot, your .env file only requires a TOKEN

Contents of the file should look like this
```
TOKEN="YOURBOTTOKEN"
CLIENTID="YOURCLIENTID"
```
Once you created your .ENV file run the command
```bash
pnpm run start
```
Finally you should see in your terminal 
```
Logged in as [botName]! | [botID]
```