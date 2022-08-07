const { Routes } = require('discord-api-types/v9');
const path = require("path");
const fs = require("fs");
const {Snowflake, SlashCommandBuilder, REST} = require("discord.js");


// If deploying to Global, set ID and TOKEN to Salemeh, else use BonBon
let clientId = undefined;
let token = undefined;
if(process.argv[2] === "global") {
	clientId = process.env.RIADSALEMEHID;
	token = process.env.RIADSALEMEH;
} else {
	clientId = process.env.BONBONID;
	token = process.env.BONBON;
}

const guildId = process.env.GUILDID;
const dirPath = path.resolve((__dirname + "/../../prod/" + "interactions"));
console.log(__dirname + "/../" + "interactions");

const commands = [];
const commandFiles = fs.readdirSync(dirPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`${dirPath}/${file}`);
	console.log(`${dirPath}/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);


//TODO: refactor this so you can pick which clientID to pass, use npm parameters and process.argv
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		console.log(process.argv);

		// GUILD BASED COMMANDS
		if(process.argv[2] === "local") {
			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
					{ body: commands },
			)
		}

		// GLOBAL COMMANDS, ONLY USE ON DEPLOYEMENT
		else if (process.argv[2] === "global") {
			await rest.put(
				Routes.applicationCommands(clientId),
				{body: commands}
			)
		}

		else {
			console.log("LOCAL/GLOBAL PARAMETER NOT PASSED\NCANCELLED DEPLOYMENT");
			return ;
		}

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();