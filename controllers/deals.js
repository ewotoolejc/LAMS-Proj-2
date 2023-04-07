const Deal = require('../models/deal');

module.exports = {
    index,
    new: newDeal,
}

async function index(req, res) {
    const deals = await Deal.find({} );
    res.render('deals/index', { title: 'Deals & Partnerships', deals })
};

function newDeal(req, res) {
    res.render('deals/new', { title: 'Add New Deal or Partnership' })
};