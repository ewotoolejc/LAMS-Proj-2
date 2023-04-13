const User = require('../models/user');

module.exports = {
    edit,
    update,
}

async function edit(req, res) {
    const user = await User.findById(req.params.id).populate('artists').populate('deals');
    res.render('users/edit', { title: "Edit Your Account", user }) 
}

async function update(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/users/${user._id}/edit`); 
}