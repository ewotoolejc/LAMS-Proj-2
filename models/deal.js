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
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
}],
user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
}],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Deal', dealSchema);