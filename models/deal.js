const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const dealSchema = new Schema ({
    name: String,
    info: String,
    artists: [{
        type: Schema.Types.ObjectId,
        ref: "Artist"
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Deal', dealSchema);