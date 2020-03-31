const express = require('express');
const path = require('path');
const app = express();
const db = require('./db').getDb;

// Load view Engne
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set middleware so that we can use parsed data from for or urls
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Handle get request or home route
app.get('/', (req, res) => {
    //Fetch data from database and display them here
    db().collection("todos").find({}).toArray(function (err, todos) {
        if (err) throw err;
        res.render('index', { todos });
    });
});



// Handle Add Post request on todo/add router
app.post('/todo/add', (req, res) => {
    //Add data to database using db connection that we created in db.js file
    db().collection('todos').insertOne(req.body, (err, result) => {
        if (err) {
            console.log('error in adding todo');
        }
        res.redirect('/');
    });
});

//start the server on port
app.listen(8080, (err) => {
    if (err) {
        console.log('error in listning...');
        return;
    }
    console.log('Server running on port 8080....');
});