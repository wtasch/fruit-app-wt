const Fruit = require('../models').Fruit;
const User = require('../models').User;
const Season = require('../models').Season;

const index = (req, res) => {
    Fruit.findAll({
        order: [
            ['name', 'DESC'],
            ['id', 'ASC']
        ]
    })//select * from "Fruits";
    .then(casey => {//casey is a temp local variable that has all the fruits
        res.render('index.ejs', {
            fruits: casey//fruits is the key and casey is its value
        })
    })
}

const show = (req, res) => {
    Fruit.findByPk(req.params.index, {
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Season
            }
        ],
        attributes: ['name', 'color', 'readyToEat']
    })
    .then(foundFruit => {
        res.render('show.ejs', {
            fruit: foundFruit
        })
    })
}

const newFruit = (req, res) => {
    res.render('new.ejs');
}

const create = (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    }
    else {
        req.body.readyToEat = false;
    }

    req.body.userId = req.user.id;
    
    Fruit.create(req.body)
    .then(newFruit => {
        //default is GET in redirect
        res.redirect('/fruits');
    })
}


const deleteFruit = (req, res) => {
    Fruit.destroy({
        where: {id: req.params.index}
    })
    .then(() => {
        res.redirect('/fruits');
    })
    
}

const editFruit = (req, res) => {
    Fruit.findByPk(req.params.index)//find the fruit by id
    .then(foundFruit => {//once the fruit is found
        Season.findAll()//query Seasons table to get all seasons
        .then(allSeasons => {
            res.render('edit.ejs', {//send fruit and seasons data back to the view
                fruit: foundFruit,
                seasons: allSeasons
            })
        })
    })
}

const addFruit = (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    }
    else {
        req.body.readyToEat = false;
    }
    Fruit.update(req.body, {
        where: {id: req.params.index},
        returning: true
    })
    .then(updatedFruit => {
        Season.findByPk(req.body.season)
        .then(foundSeason => {
            Fruit.findByPk(req.params.index)
            .then(foundFruit => {
                foundFruit.addSeason(foundSeason);
                //foundSeason.addFruit(foundFruit);
                res.redirect(`/fruits/${req.params.index}`);
            })
        })
        
    })
    
}

module.exports = {
    index,
    show,
    newFruit,
    create,
    deleteFruit,
    editFruit,
    addFruit
}