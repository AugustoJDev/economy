const { EmbedBuilder } = require("discord.js");

function getEmbed(interaction, embed) {

    if(!embed) return "Embed não fornecido.";

    let listOfEmbeds = {
        bonusEmbed: new EmbedBuilder()
            .setAuthor({ name: `Loja de Bônus`, iconURL: interaction.guild.iconURL() })
            .addFields([{
                name: `<:xp_dev:1108993287555137577> | 2x XP - 1 Hora`,
                value: `<a:coin_dev:1108646199692632087> 50`
            },
            {   
            name: `<:xp_dev:1108993287555137577> | 2x XP - 5 Horas`,
            value: `<a:coin_dev:1108646199692632087> 225 ( 10% OFF )`
            },
            {
                name: `<:xp_dev:1108993287555137577> | 2x XP - 10 Horas`,
                value: `<a:coin_dev:1108646199692632087> 400 ( 20% OFF )`
            },
            {
                name: `<a:clock_dev:1108997049313132605> | Reduzir 10% Cooldown`,
                value: `<a:coin_dev:1108646199692632087> ??`
            },
            {
                name: `<a:clock_dev:1108997049313132605> | Reduzir 25% Cooldown`,
                value: `<a:coin_dev:1108646199692632087> ??`
            },
            {
                name: `<a:clock_dev:1108997049313132605> | Reduzir 50% Cooldown`,
                value: `<a:coin_dev:1108646199692632087> ??`
            }]),

        categoryEmbed: new EmbedBuilder()
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
                name: "<:bonus_dev:1108997587790483540> | Bônus",
                value: "Lista de bônus de moedas. Ex.: 2x Coins, Reduzir Cooldown, etc."
            }])
    };

    return listOfEmbeds[embed];
};

module.exports = getEmbed;