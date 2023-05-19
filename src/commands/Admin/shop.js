const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
const embeds = require("../../Components/embeds");
const buttons = require("../../Components/buttons");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(basename(__filename))
		.setDescription('Mostra os itens da loja do bot.'),
	async execute(interaction) {

        const buttonsMain = new ActionRowBuilder()
			.addComponents(buttons("passButton"), buttons("profileButton"), buttons("bonusButton"));

        interaction.reply({
            embeds: [embeds(interaction, "categoryEmbed")],
            components: [buttonsMain],
            ephemeral: true,
            fetchReply: true
        }).then(int => {

            const collector = int.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

            collector.on('collect', i => {

                if(i.customId == "return") {
                    interaction.editReply({
                        embeds: [embeds(interaction, "categoryEmbed")],
                        components: [buttonsMain],
                        ephemeral: true
                    })

                    return i.deferUpdate();
                }

                const buttonsCollector = new ActionRowBuilder()
                    .addComponents(buttons("returnButton"));

                interaction.editReply({
                    embeds: [embeds(interaction, i.customId)],
                    components: [buttonsCollector],
                    ephemeral: true
                })

                i.deferUpdate();
            });
        })
	},
};