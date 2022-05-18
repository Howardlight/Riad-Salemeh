const { CommandInteraction } = require("@discordjs/builders");

export const deleteCommands = async (interaction: typeof CommandInteraction) => {

    if (!interaction.isCommand()) return;

    const clients: any = interaction.client;
    console.log(interaction.commandId);


    // GLOBAL
    clients.api.applications(clients.user.id).commands(interaction.commandId).delete();

    // GUILD BASED
    // clients.api.applications(clients.user.id).guilds(process.env.GUILDID).commands(interaction.commandId).delete();
    console.log(`successfully deleted ${interaction.commandName} of ID ${interaction.commandId}`);
}