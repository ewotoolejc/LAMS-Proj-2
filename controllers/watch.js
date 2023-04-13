const Artist = require('../models/artist');
const User = require('../models/user');

module.exports = {
    index,
}

async function index(req, res) {
    const artists = await Artist.find({} ).populate('user');
    res.render('watch/index', { title: 'Watch', artists })
};