import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription("___"),
    async execute(interaction: CommandInteraction) {

        const { member } = interaction;
        if( member!.user.id === "689419768666521631") {
            let list: String[] = [];

            interaction.client.guilds.cache.forEach(guild => {
                list.push(`${guild.name} | ${guild.id}`);
            })

            await interaction.reply(list.join("\n").toString());
        } else return ;

    },
};