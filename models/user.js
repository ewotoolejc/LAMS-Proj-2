const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  labelname: String,
  googleId: {
    type: String,
    required: true
  },
  email: String,
  avatar: String,
  artists: [{
    type: Schema.Types.ObjectId,
    ref: "Artist"
}],
deals: [{
  type: Schema.Types.ObjectId,
  ref: 'Deal'
}],
admin: Boolean,
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
