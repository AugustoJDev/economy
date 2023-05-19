const { ButtonBuilder, ButtonStyle } = require("discord.js");

function getButton(button) {

    let listOfButtons = {
        passButton: new ButtonBuilder()
			.setCustomId('passEmbed')
			.setLabel('Passe')
            .setEmoji('1108645641674031154')
			.setStyle(ButtonStyle.Secondary),

		profileButton: new ButtonBuilder()
			.setCustomId('profileEmbed')
			.setLabel('Perfil')
            .setEmoji('1108647883655348224')
			.setStyle(ButtonStyle.Secondary),

        bonusButton: new ButtonBuilder()
            .setCustomId('bonusEmbed')
            .setLabel('Bônus')
            .setEmoji('1108646199692632087')
            .setStyle(ButtonStyle.Secondary),

        returnButton: new ButtonBuilder()
            .setCustomId('return')
            .setLabel('Retornar')
            .setEmoji('1109000956017901651')
            .setStyle(ButtonStyle.Secondary),
    };

    return listOfButtons[button];
};

module.exports = getButton;