const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const key = process.env.KEY || 'morifeoluwa';

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('welcome to the Natterbase API!');
});

app.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.json({ message: 'unable to login', data: 'Please provide both username and password'})
    } else if (req.body.username != 'admin' || req.body.password != 'admin') {
        res.json({ message: 'unable to login', data: 'Incorrect username or password'})
    } else {
        const token = jwt.sign(req.body, key);
        res.json({ message: 'user successfully authenticated', data: token })
    }
})
var countries = [];

app.get('/countries', (req, res) => {
    const token = req.query.token;
    jwt.verify(token, key, (err, response) => {
        if (err) {
            res.json({message: 'unable to authenticate user', data: err})
        } else {
            res.json({ message: 'successfully fetched all countries', data: countries, credentials: response});
        }
    });
})

app.post('/countries', (req, res) => {
    const token = req.query.token;
    jwt.verify(token, key, (err, response) => {
        if (err) {
            res.json({message: 'unable to authenticate user', data: err})
        } else {
            const data = req.body;
            countries.push(data.country);
            res.json({ message: 'New Country successfully added', data: countries, credentials: response});
        }
    });
})

app.delete('/countries', (req, res) => {
    const token = req.query.token;
    jwt.verify(token, key, (err, response) => {
        if (err) {
            res.json({message: 'unable to authenticate user', data: err})
        } else {
            const data = req.body;
            const index = countries.indexOf(data.country);
            if (index > -1) {
                countries.splice(index, 1);
                res.json({message: 'A Country has been successfully deleted', data: countries, credentials: response })
            } else {
                res.json({message: 'unable to locate country in array', data: countries, credentials: response });
            }
        }
    });
})

var port = process.env.port || 7000
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
});