const Deal = require('../models/deal');
const Artist = require('../models/artist');
const User = require('../models/user');

module.exports = {
    index,
    new: newDeal,
    details,
    create,
    delete: deleteDeal,
    edit,
    update,
};

async function index(req, res) {
    const deals = await Deal.find({} ).populate('artists').populate('user');
    res.render('deals/index', { title: 'Deals & Partnerships', deals })
};

async function newDeal(req, res) {
    const artists = await Artist.find({} );
    res.render('deals/new', { title: 'Add New Deal or Partnership', artists })
};

async function details(req, res) {
    const deal = await Deal.findById(req.params.id).populate('artists').populate('user');
    const artists = await Artist.find({} );
    res.render('deals/details', { title: `${deal.name}`, deal, artists })
};

async function edit(req, res) {
    const deal = await Deal.findById(req.params.id).populate('artists');
    res.render('deals/edit', { title: `${deal.name} Edit`, deal })
};

async function update(req, res) {
    const deal = await Deal.findById(req.params.id);
    await Deal.updateOne(deal, req.body);
    res.redirect(`/deals/${deal._id}`);
};

async function deleteDeal(req,res) {
    const deal = await Deal.findById(req.params.id);
    await Deal.deleteOne(deal);
    res.redirect('/deals');
};

async function create(req, res) {  
    req.body.user = req.user._id; 
    try {
        const deal = await Deal.create(req.body);
        const user = await User.findById(req.body.user);
        if (req.body.artistId === '') {
        res.redirect(`/deals/${deal._id}`);
        };
        if (Array.isArray(req.body.artistId) === true) {
        await Deal.updateOne({ _id: deal._id }, { $push: { artists: { $each: req.body.artistId } } });
        await Artist.updateMany({ _id: req.body.artistId }, { $push: { deals: deal._id } } );
        user.deals.push(deal._id);
        await user.save();
        res.redirect(`/deals/${deal._id}`);
        };
        if (Array.isArray(req.body.artistId) === false) {
        const artist = await Artist.findById(req.body.artistId);
        deal.artists.push(artist._id);
        await deal.save();
        artist.deals.push(deal._id);
        await artist.save();
        user.deals.push(deal._id);
        await user.save();
        res.redirect(`/deals/${deal._id}`);
        };
     } catch (err) {
       console.log(err);
       res.render('deals/new', { errorMsg: err.message });
     }
};