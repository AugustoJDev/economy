module.exports = {
	name: basename(__filename),
	async execute(oldMember, newMember) {

		const memberInfo = await memberData(newMember.id, newMember.guild.id);

		/*
		memberInfo.antiraid.bot = "Ativado"
        memberInfo.markModified('antiraid.bot');
        await memberInfo.save();
		*/

        countMoney(oldMember, newMember, memberInfo);
    }
};

async function countMoney(oldMember, newMember, memberInfo) {

	if(newMember.channelId !== null) {
		memberInfo.voice.join = Date.now();
		memberInfo.markModified("voice.join");
		await memberInfo.save();
	};

	if(!newMember.channelId) {
		let timeInMS = memberInfo.voice.join - Date.now();
		let timeConverted = msToTime(timeInMS);

		memberInfo.voice.hours = timeConverted;
		memberInfo.markModified("voice.hours");
		await memberInfo.save();

		let hours = Number(timeConverted.split(":")[0]);
		let moneyPerHour = hours * 100;

		if(hours > 4) hours = 4;

		
	};
};

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