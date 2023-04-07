const Artist = require('../models/artist');

module.exports = {
    index,
    new: newArtist,
    details,
    create,
}

async function index(req, res) {
    const artists = await Artist.find({} );
    res.render('artists/index', { title: 'Roster', artists })
};

function newArtist(req, res) {
    res.render('artists/new', { title: 'Add New Artist' })
};

async function details(req, res) {
    const artist = await Artist.findById(req.params.id);
    res.render('artists/details', { title: `${artist.name}`, artist })
};

async function create(req, res) {
    if (req.body.signed = 'false') {
    res.redirect('/watch');
    };
    try {
        const artist = await Artist.create(req.body);
        res.redirect(`/artists/${artist._id}`)
     } catch (err) {
       // Typically some sort of validation error
       console.log(err);
       res.render('artists/new', { errorMsg: err.message });
     }
};