import { CommandInteraction, Interaction } from "discord.js";
import { interactions } from "..";

export const onInteraction = async (interaction: Interaction) => {


    // console.log(`${interaction.user.tag} in #${interaction.channel!} triggered an interaction.`);
    if (!interaction.isCommand()) return;

    const command: any = interactions.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}