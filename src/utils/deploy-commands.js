const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const path = require("path");
const fs = require("fs");



const token = process.env.TOKEN;
const guildId = process.env.GUILDID;
const clientId = process.env.CLIENTID;
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