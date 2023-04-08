const Deal = require('../models/deal');
const Artist = require('../models/artist');

module.exports = {
    index,
    new: newDeal,
    details,
    create,
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
    // const artists = await Artist.find({} );
    res.render('deals/details', { title: `${deal.name}`, deal })
};
// WORKS FOR ONE BELOW

async function create(req, res) {
    console.log(req);
    try {
        const artist = await Artist.findById(req.body.artistId);
        const deal = await Deal.create(req.body);
        deal.artists.push(artist._id);
        await deal.save();
        artist.deals.push(deal._id);
        await artist.save();
        res.redirect(`/deals/${deal._id}`);
     } catch (err) {
       console.log(err);
       res.render('deals/new', { errorMsg: err.message });
     }
};

// async function create(req, res) {
//     try {
//         const artists = []; 
//         await Artist.find(req.body.artistId.forEach(function(aid) {
//             artiststodeal.push(aid);
//             artists.push(aid);
//         } ));
//         const deal = await Deal.create(req.body);
//         deal.artists.push(artists);
//         dealdest.push(deal);
//         saveDealtoArt(); 
//         await deal.save();
//         res.redirect(`/deals/${deal._id}`);
//      } catch (err) {
//        console.log(err);
//        res.render('deals/new', { errorMsg: err.message });
//      }
// };

// let artiststodeal = [];
// let dealdest;


// async function saveDealtoArt() {
//     artiststodeal.forEach(function(aid) {
//         aid.deals.push(dealdest);
//         await aid.save();
// })};