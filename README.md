# Riad-Salemeh-TS
Riad Salemeh TS is a Discord Bot built using Typescript

It allows users to monitor the LBP to USD rate by Webscraping

The Website used as a source is www.lbprate.com

## Compiling
To run the bot you must first compile the Typescript version to Javascript

First install the required dependencies then run the command tsc:
```bash
npm install
tsc
```

Once you compiled the typescript version you should see a new folder called "prod"

## Usage
You must first create a .ENV file in the same folder as your package.json

This file will contain your TOKEN, PREFIX and CLIENTID

Contents of the file should look like this
```
TOKEN="YOURBOTTOKEN"
PREFIX="YOURPREFIX"
CLIENTID="YOURCLIENTID"
```
Once you created your .ENV file run the command
```bash
npm run start
```
Finally you should see in your terminal 
```
Logged in as [botName]! | [botID]
```
