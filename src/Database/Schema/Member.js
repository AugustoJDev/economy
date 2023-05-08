const mongoose = require("mongoose");

module.exports = mongoose.model("Member", new mongoose.Schema({
    id: { type: String },
    guild: { type: String },
    registeredAt: { type: Number, default: Date.now() },
    voice: { type: Object, default: {
        join: { type: Number, default: 0 },
        money: { type: Number, default: 0 },
        hours: { type: Number, default: "0" },
        limit: { type: Boolean, default: false }
      }
    }
}));