module.exports = {
	name: basename(__filename),
	async execute(oldMember, newMember) {

		const memberInfo = await memberData(newMember.id, newMember.guild.id);

        countMoney(oldMember, newMember, memberInfo);
    }
};

async function countMoney(oldMember, newMember, memberInfo) {

	if(newMember.selfMute == true) {
		points = 1
	} else {
		points = 4
	}

	if(newMember.channelId !== null) {
		memberInfo.voice.join = Date.now();
		memberInfo.markModified("voice.join");
		await memberInfo.save();
	};

	if(!newMember.channelId) {

		let timeInMS = Date.now() - memberInfo.voice.join;
		let timeConverted = msToTime(timeInMS);

		let totalTimeInMS = memberInfo.voice.hours + timeInMS;
			
		let totalTime = msToTime(totalTimeInMS)
			totalTime = totalTime.toString().replace("-", "").split(":")[0]
			totalTime = Number(totalTime)

		memberInfo.voice.hours = totalTimeInMS;
		memberInfo.markModified("voice.hours");
		await memberInfo.save();

		let hours = Number(timeConverted.split(":")[0]);

		if(hours > 4) hours = 4;

		let ableToGain = (20 - totalTime)
		let inVoice = ableToGain - hours
		let removeForLimit = remNeg(inVoice) * points

		let moneyPerHour = (hours * points) - removeForLimit;
			moneyPerHour = Number(moneyPerHour.toString().replace("-", ""))

		if(memberInfo.voice.limit == true) return;

		if(totalTime >= 20) {
			memberInfo.voice.limite = true
			memberInfo.markModified("voice.limit");
			await memberInfo.save();
			return;
		};

		memberInfo.voice.money = memberInfo.voice.money + moneyPerHour
		memberInfo.markModified("voice.money");
		await memberInfo.save();
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

function remNeg(value) {
	let val = Number(value.toString().replace("-", ""))

	return val;
}