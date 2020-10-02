const User = require('../models').User;
const Fruit = require('../models').Fruit;

const renderProfile = (req, res) => {
    User.findByPk(req.user.id, {
        include: [
            {
                model: Fruit,
                attributes: ['id', 'name']
            }
        ]
    })
    .then(userProfile => {
        console.log(userProfile);
        res.render('users/profile.ejs', {
            user: userProfile
        })
    })
    
}

const editProfile = (req, res) => {
    User.update(req.body, {
        where: {id: req.user.id},
        returning: true
    })
    .then(updatedUser => {
        res.redirect(`/users/profile`);
    })
    
}

const deleteUser = (req, res) => {
    User.destroy({
        where: {id: req.user.id}
    })
    .then(() => {
        res.redirect('/users');
    })
}

module.exports = {
    renderProfile,
    editProfile,
    deleteUser
}