const express = require('express');
const router = express.Router();
const apiService = require('../server/index');
const { Client } = require('pg');

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

connect()

async function fetchData() {
  //await client.connect()
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
 

//////

router.post('/updateCalendar', async (req, res) => {
  const change = req.body;
  await change.forEach(date => {
    console.log(date);
    client.query(`UPDATE Calendar SET availability = 0 WHERE day = '${date}'`);
  });
  const resa = await client.query('select * from Calendar');
  res.send(resa.rows);

});

/////

router.get('/delete', async (req, res) => {
  await client.query('DROP TABLE Users');
  res.end();
  console.log('Sent list of items');
});
router.get('/createuser', async (req, res) => {
  await client.query(`insert into Users(username, password, name) values ('Salt', 'sales', 'salt')`);
});

router.get('/insertCal', async (req, res) => {
  // await client.connect();
  await client.query(`create table if not exists Calendar (
    id serial primary key,
    day varchar not null unique,
    availability integer not null,
    userbooked integer not null
);`);
  for (let i = 1; i < 32; i++) {
    let date = `${i}`;
    let boook = Math.round(Math.random());
    await client.query(`insert into Calendar(day, availability, userbooked) values ('${date}', ${boook}, '4')`);
  }
  res.end();
});

router.get('/getCal', async (req, res) => {
  //await client.connect();
  const resa = await client.query('select * from Calendar');
  res.send(resa.rows);
});

router.get('/deleteCal', async (req, res) => {
  //await client.connect()

  await client.query('DROP TABLE Calendar');
  res.end();
});

router.get('/create', async (req, res) => {
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
router.get('/getList', async (req, res) => {
  var list = await fetchData();
  res.send(list.rows);
  console.log('Sent list of items');
});

module.exports = router;