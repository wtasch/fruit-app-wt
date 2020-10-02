require('dotenv').config();

const express = require('express');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const app = express();//app is an object

//middleware to convert request body into urlencoded oject
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(express.static("public"));

app.use(cookieParser());


const verifyToken = (req, res, next) => {
    let token = req.cookies.jwt;
    console.log(`Token: ${token}`);

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if(err || !decodedUser){
            return res.send('Error in JWT');
        }
        console.log(decodedUser)
        req.user = decodedUser;

        next();
    })

}

app.use('/auth', routes.auth);
app.use('/fruits', verifyToken, routes.fruits);
app.use('/users', verifyToken, routes.users);//http:localhost:3000/users/1

app.get('/', (req, res) => {
    res.render('users/index.ejs');
})

//listen is used to run your app on port 3000
app.listen(process.env.PORT, () => {
    console.log(`I am listening on port ${process.env.PORT}`);
})