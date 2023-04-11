const Deal = require('../models/deal');
const Artist = require('../models/artist');

module.exports = {
    index,
    new: newDeal,
    details,
    create,
    delete: deleteDeal,
    edit,
    update,
}

async function index(req, res) {
    const deals = await Deal.find({} ).populate('artists');
    res.render('deals/index', { title: 'Deals & Partnerships', deals })
};

async function newDeal(req, res) {
    const artists = await Artist.find({} );
    res.render('deals/new', { title: 'Add New Deal or Partnership', artists })
};

async function details(req, res) {
    const deal = await Deal.findById(req.params.id).populate('artists');
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

// WORKS FOR ONE BELOW
// async function create(req, res) {
//     try {
//         const artist = await Artist.findById(req.body.artistId);
//         const deal = await Deal.create(req.body);
//         if (req.body.artistId = ' ') {
//             res.redirect(`/deals/${deal._id}`);
//         };        
//         deal.artists.push(artist._id);
//         await deal.save();
//         artist.deals.push(deal._id);
//         await artist.save();
//         res.redirect(`/deals/${deal._id}`);
//      } catch (err) {
//        console.log(err);
//        res.render('deals/new', { errorMsg: err.message });
//      }
// };

async function deleteDeal(req,res) {
    const deal = await Deal.findById(req.params.id);
    await Deal.deleteOne(deal);
    res.redirect('/deals');
};

async function create(req, res) {
    console.log(req.body.artistId);   
    try {
        const deal = await Deal.create(req.body);
        if (req.body.artistId = ' ') {
            res.redirect(`/deals/${deal._id}`);
            };        
        await Deal.updateOne({ _id: deal._id }, { $push: { artists: { $each: req.body.artistId } } });
        res.redirect(`/deals/${deal._id}`);
     } catch (err) {
       console.log(err);
       res.render('deals/new', { errorMsg: err.message });
     }
};

// let artiststodeal = [];
// let dealdest;


// async function saveDealtoArt() {
//     artiststodeal.forEach(function(aid) {
//         aid.deals.push(dealdest);
//         await aid.save();
// })};