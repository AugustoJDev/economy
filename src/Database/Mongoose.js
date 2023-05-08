global.memberSchema = require("./Schema/Member.js"),
      mongoose = require("mongoose");
      
mongoose.connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('[+]'.brightGreen + ' Conectado no Banco de Dados'.blue);
}).catch((err) => {
    console.log(`Não foi possível conectar no Banco de Dados.\nError: ${err}`.brightRed);
});

module.exports.fetchMember = async function(userID, guildID){

    let memberDB = await memberSchema.findOne({ id: userID, guildID: guildID });
    if(memberDB){
        return memberDB;
    } else {
        memberDB = new memberSchema({
            id: userID,
            guildID: guildID,
            registeredAt: Date.now(),
            voice: {
                join: 0,
                money: 0,
                hours: "0",
                limit: false
            }
        })
        await memberDB.save().catch(err => console.log(err));
        return memberDB;
    };
};