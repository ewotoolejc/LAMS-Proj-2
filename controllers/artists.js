const Artist = require('../models/artist');
const Deal = require('../models/deal');

module.exports = {
    index,
    new: newArtist,
    details,
    create,
    delete: deleteArtist,
};

async function index(req, res) {
    const artists = await Artist.find({} );
    res.render('artists/index', { title: 'Roster', artists })
};

function newArtist(req, res) {
    res.render('artists/new', { title: 'Add New Artist' })
};

async function details(req, res) {
    const artist = await Artist.findById(req.params.id).populate('deals');
    res.render('artists/details', { title: `${artist.name}`, artist })
};

async function create(req, res) {
    req.body.signed = !!req.body.signed
    try {
        const artist = await Artist.create(req.body);
        if (artist.signed === false) {
            res.redirect('/watch');
            };
        res.redirect(`/artists/${artist._id}`)
     } catch (err) {
       // Typically some sort of validation error
       console.log(err);
       res.render('artists/new', { errorMsg: err.message });
     }
};

async function deleteArtist(req, res) {
    const artist = await Artist.findById(req.params.id);
    if (artist.signed === false) {
        await Artist.deleteOne(artist ); 
        res.redirect('/watch');
    } else {
    await Artist.deleteOne(artist);
    res.redirect('/artists');
  };};