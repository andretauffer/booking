const express = require('express');
const path = require('path');
const { Client } = require('pg');

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
    await client.query(`insert into Users(username, password) values ('Chris', 'Cross')`);
    const res = await client.query('select * from Users');
    console.log(res.rows); // Hello world!
    return res;
}

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', async (req, res) => {
    var list = await fetchData();
    res.send(list.rows);
    console.log('Sent list of items');
});

app.get('/api/delete', async (req, res) => {
    killServ();
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