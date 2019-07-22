const express = require('express');
const path = require('path');
const { Client } = require('pg');
const bodyParser = require('body-parser')
const dbsetup = require('./db_setup');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'docker',
    database: 'postgres'
});

const connect = async () => {
    try {
        await client.connect()
    } catch (e) {
        console.log('error', e);
    }
};

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());

app.post('/api/login', async (req, res) => {
    let user = await client.query('SELECT * FROM Users WHERE username = $1', [req.body.username]);
    if (user.rows.length > 0) {
        if (user.rows[0].password === req.body.password) {
            const retVal = {login: 1, username: user.rows[0].username, name: user.rows[0].name}
            res.send(JSON.stringify(retVal));
            console.log('Login Successfull');
        }
        else {
            const retVal = {login: 0, status: 'Invalid Password'}
            res.send(JSON.stringify(retVal));
        }
    } else {
        const retVal = {login: 0, status: 'User does not exist'}
        res.send(JSON.stringify(retVal));
    }
});

app.get('/api/getCalendar/:year/:month', async (req, res) => {
    let currMonth = req.params.month;
    let currYear = req.params.year;
    let month = await client.query(`SELECT * FROM Calendar WHERE month = ${currMonth} and year = ${currYear}`);
    res.send(JSON.stringify(month.rows));
});

app.post('/api/updateCalendar', async (req, res) => {
    const change = req.body;
    await change.days.forEach(id => {
      client.query(`UPDATE Calendar SET availability = 0, customer = ${change.user} WHERE id = ${id}`);
    });
    const resa = await client.query(`select * from Calendar WHERE month = ${change.month} and year = ${change.year} `);
    res.send(resa.rows);
  });

app.post('/api/removeBooking', async (req, res) => {
    const change = req.body;
    await change.days.forEach(id => {
      client.query(`UPDATE Calendar SET availability = 1, customer = null WHERE id = ${id}`);
    });
    const resa = await client.query(`select * from Calendar WHERE month = ${change.month} and year = ${change.year} `);
    res.send(resa.rows);
  });

app.use('/db', dbsetup);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

connect();
console.log('App is listening on port ' + port);
module.exports.client = client