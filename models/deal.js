const mongoose = require('mongoose');
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
}, {
    timestamps: true,
    }
);

module.exports = mongoose.model('Deal', dealSchema);