const Artist = require('../models/artist');
const Deal = require('../models/deal');
const User = require('../models/user');

module.exports = {
    index,
    new: newArtist,
    details,
    create,
    delete: deleteArtist,
    edit,
    update,
    addArtisttoDeal,
    updateToSigned,
};

async function index(req, res) {
    const artists = await Artist.find({} );
    res.render('artists/index', { title: 'Roster', artists })
};

async function newArtist(req, res) {
    res.render('artists/new', { title: 'Add New Artist' })
};

async function details(req, res) {
    const artist = await Artist.findById(req.params.id).populate('deals').populate('user');
    res.render('artists/details', { title: `${artist.name}`, artist })
};

async function edit(req, res) {
    const artist = await Artist.findById(req.params.id).populate('deals');
    const users = await User.find({} );
    res.render('artists/edit', { title: `${artist.name} Edit`, artist, users })
};

async function update(req, res) {
    const artist = await Artist.findById(req.params.id);
    console.log(req.body.userId);
    if (artist.signed === true) {
    req.body.signed_on += 'T00:00';
    } else if (artist.signed === false) {
        req.body.signed_on = '';
    }
    await Artist.updateOne(artist, req.body);
    artist.user.push(req.body.userId);
    await artist.save();
    if (req.body.userId !== undefined) {
    const user = await User.findById(req.body.userId);
    user.artists.push(artist._id)
    await user.save();
    };
    res.redirect(`/artists/${artist._id}`);
};

async function updateToSigned(req, res) {
    const artist = await Artist.findById(req.params.id);
    req.body.signed = !!req.body.signed;
    req.body.signed_on += 'T00:00';
    await Artist.updateOne(artist, req.body);
    res.redirect(`/artists/${artist._id}`); 
};

async function addArtisttoDeal(req, res) {
    const deal = await Deal.findById(req.params.id);
    if (Array.isArray(req.body.artistId) === true) {
    await Deal.updateOne({ _id: deal._id }, { $push: { artists: { $each: req.body.artistId } } });
    await Artist.updateMany({ _id: req.body.artistId }, { $push: { deals: deal._id } } );
    res.redirect(`/deals/${deal._id}`);
    }; 
    if (Array.isArray(req.body.artistId) === false) {
    const artist = await Artist.findById(req.body.artistId);
    deal.artists.push(req.body.artistId);
    await deal.save();
    artist.deals.push(deal._id);
    await artist.save();
    res.redirect(`/deals/${deal._id}`);
    };
};

async function create(req, res) {
    req.body.signed = !!req.body.signed;
    if (req.body.signed === true) {
    req.body.signed_on += 'T00:00';
    };
    req.body.user = req.user._id;
    try {
        const artist = await Artist.create(req.body);
        const user = await User.findById(req.body.user);
        user.artists.push(artist._id);
        await user.save();
        if (artist.signed === false) {
            res.redirect('/watch');
        };
        res.redirect(`/artists/${artist._id}`)
     } catch (err) {
       console.log(err);
       res.render('artists/new', { errorMsg: err.message });
     }
};

async function deleteArtist(req, res) {
    const artist = await Artist.findById(req.params.id);
    if (artist.signed === false) {
        await Artist.deleteOne(artist); 
        res.redirect('/watch');
    } else {
    await Artist.deleteOne(artist);
    res.redirect('/artists');
};};