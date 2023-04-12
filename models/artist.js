const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const songSchema = new Schema ({
    title: { type: String, required: true },
    album_name: String,
    released: Date,
    songlink: String,
}, {
    timestamps: true,
});

const artistSchema = new Schema ({
    name: { type: String, required: true },
    picture: String,
    signed: { type: Boolean, default: false },
    signed_on: Date,
    details: String,
    songs: [songSchema],
    deals: [{
        type: Schema.Types.ObjectId,
        ref: 'Deal'
    }],
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
}],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Artist', artistSchema);