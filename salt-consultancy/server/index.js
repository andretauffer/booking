const express = require('express');
const path = require('path');
const { Client } = require('pg');
const bodyParser = require('body-parser')

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'docker',
    database: 'postgres'
});

const connecta = async () => {
    try {
        await client.connect()
    } catch (e) {
        console.log('error', e);
    }
};

const killServ = async () => {
    await client.query('DROP TABLE Users');
}

const app = express();

async function fetchData() {
    await client.query(`create table if not exists Users (
            id serial primary key,
            username varchar not null,
            password varchar not null
);`)
    // await client.query(`insert into Users(username, password) values ('Andre', 'brazil')`);
    // await client.query(`insert into Users(username, password) values ('Chris', 'sweden')`);
    // await client.query(`insert into Users(username, password) values ('Chris', 'england')`);
    const res = await client.query('select * from Users');
    console.log(res.rows); // Hello world!
    return res;
}

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());

// An api endpoint that returns a short list of items
app.get('/api/getList', async (req, res) => {
    var list = await fetchData();
    res.send(list.rows);
    console.log('Sent list of items');
});
app.post('/api/login', async (req, res) => {
    // validate against database
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
        console.log(user.rows);
        console.log(req.body);
    } else {
        const retVal = {login: 0, status: 'User does not exist'}
        res.send(JSON.stringify(retVal));
    }
});

app.get('/api/delete', async (req, res) => {
    killServ();
    res.end();
    console.log('Sent list of items');
});
app.get('/api/create', async (req, res) => {
    await client.query(`create table if not exists Users (
        id serial primary key,
        username varchar not null unique,
        password varchar not null,
        name varchar not null
);`)
    await client.query(`insert into Users(username, password, name) values ('Andre', 'brazil', 'André Tauffer')`);
    await client.query(`insert into Users(username, password, name) values ('Chris', 'sweden', 'Christian Sandström')`);
    await client.query(`insert into Users(username, password, name) values ('Christoffer', 'england', 'Christoffer Sundqvist')`);
    res.end();
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

connecta();
console.log('App is listening on port ' + port);