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
    picture: { type: String, set: a => a === '' ? undefined : a },
    signed: { type: Boolean, default: false },
    signed_on: { type: Date, set: b => b === 'T00:00' ? undefined : b },
    details: String,
    songs: [songSchema],
    deals: [{
        type: Schema.Types.ObjectId,
        ref: 'Deal'
    }],
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        set: c => c === '' ? undefined : c, 
}],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Artist', artistSchema);