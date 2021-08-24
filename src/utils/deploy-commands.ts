const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const path = require("path");
const fs = require("fs");



const token = process.env.TOKEN as string;
const guildId = process.env.GUILDID as string;
const clientId = process.env.CLIENTID as string;
const dirPath = path.resolve((__dirname + "/../" + "interactions"));
console.log(__dirname + "/../" + "interactions");
// console.log(fs.lstatSync(__dirname + "/../" + "interactions").isDirectory());
// const commands = [
// 	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
// 	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
// 	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
// ]
	// .map(command => command.toJSON());
const commands = [];
const commandFiles = fs.readdirSync(dirPath).filter((file: any) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`${dirPath}/${file}`);
	console.log(`${dirPath}/${file}`);
	commands.push(command.data.toJSON());
}


const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();