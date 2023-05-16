const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ms = require("ms");

// Commands don't need to have their names written here, just set the filename
module.exports = {
	data: new SlashCommandBuilder()
		.setName(basename(__filename))
		.setDescription('Mostra suas informações de chamada de voz.'),
	async execute(interaction) {

		let user = await memberData(interaction.user.id, interaction.guild.id);
		let join = new Date(user.voice.join);
			join = join.toLocaleDateString("pt-BR");

		const voiceEmbed = new EmbedBuilder()
			.setAuthor({ 
				name: `${interaction.user.username}`,
				iconURL: `${interaction.user.avatarURL()}`
			})
			.addFields([{
				name: `Moedas`,
				value: `${user.voice.money}`
			},
			{
				name: `Entrou em call`,
				value: `${join}`
			},
			{
				name: `Horas em Call`,
				value: `${user.voice.hours}/20`
			},
			{
				name: `Cooldown para Reset`,
				value: `${getTime(user)}`
			}])

		interaction.reply({
			embeds: [voiceEmbed]
		})
	},
};

function getTime(user) {

	let joinInDay = (user.voice.count + ms("24h"))

	if(joinInDay < Date.now()) {
		return "O tempo de espera acabou"
	} else {
		let timeRemaining = joinInDay - user.voice.count;

		return msToTime(timeRemaining)
	}
}

function msToTime(s) {

	function pad(n, z) {
	  z = z || 2;
	  return ('00' + n).slice(-z);
	};
  
	var ms = s % 1000;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	var hrs = (s - mins) / 60;
  
	return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
};