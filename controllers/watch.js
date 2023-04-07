const Artist = require('../models/artist');

module.exports = {
    index,
}

async function index(req, res) {
    const artists = await Artist.find({} );
    res.render('watch/index', { title: 'Watch', artists })
};