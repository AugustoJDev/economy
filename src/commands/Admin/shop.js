const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(basename(__filename))
		.setDescription('Mostra os itens da loja do bot.'),
	async execute(interaction) {

		const categoryEmbed = new EmbedBuilder()
            .setAuthor({ name: `Categorias da Loja`, iconURL: interaction.guild.iconURL() })
            .setDescription(`\`\`\`Clique no botão da categoria desejada para ser redirecionado a ela.\`\`\``)
            .addFields([{
                name: "<a:coroa_dev:1108645641674031154> | Passe VIP",
                value: "Lista de todas as opções de dias VIPs para comprar."
            },
            {
                name: "<a:discord_dev:1108647883655348224> | Perfil",
                value: "Lista de backgrounds, estilos exclusivos, perfis de temporada, etc."
            },
            {
                name: "<a:coin_dev:1108646199692632087> | Bônus",
                value: "Lista de bônus de moedas. Ex.: 2x Coins, Reduzir Cooldown, etc."
            }])

        const passButton = new ButtonBuilder()
			.setCustomId('pass')
			.setLabel('Passe')
            .setEmoji('1108645641674031154')
			.setStyle(ButtonStyle.Secondary);

		const profileButton = new ButtonBuilder()
			.setCustomId('profile')
			.setLabel('Perfil')
            .setEmoji('1108647883655348224')
			.setStyle(ButtonStyle.Secondary);

        const bonusButton = new ButtonBuilder()
            .setCustomId('bonus')
            .setLabel('Bônus')
            .setEmoji('1108646199692632087')
            .setStyle(ButtonStyle.Secondary);

        const buttons = new ActionRowBuilder()
			.addComponents(passButton, profileButton, bonusButton);

        interaction.reply({
            embeds: [categoryEmbed],
            components: [buttons],
            ephemeral: true
        })
	},
};