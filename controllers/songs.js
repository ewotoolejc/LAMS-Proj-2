const Artist = require('../models/artist');

module.exports = {
    create,
    delete: deleteSong,
};

async function create(req, res) {
    const artist = await Artist.findById(req.params.id);
    req.body.released += 'T00:00';
    artist.songs.push(req.body);
    try {
        await artist.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/artists/${artist._id}`)
};

async function deleteSong(req, res) {
    const curArtist = await Artist.findOne({ 'songs._id': req.params.id });
    if (!curArtist) return res.redirect('/artists');
    curArtist.songs.remove(req.params.id);
    await curArtist.save();
    res.redirect(`/artists/${ curArtist._id }`);
};