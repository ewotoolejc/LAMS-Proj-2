const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const songSchema = new Schema ({
    title: { type: String, required: true },
    album_name: String,
    released: Date,
}, {
    timestamps: true,
});

const artistSchema = new Schema ({
    name: { type: String, required: true },
    signed: Boolean,
    signed_on: Date,
    details: String,
    Songs: [songSchema],
    deals: [{
        type: Schema.Types.ObjectId,
        ref: 'Deal'
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Artist', artistSchema);