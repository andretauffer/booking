const express = require('express');
const router = express.Router();
const apiService = require('../server/index');
const pg = require('pg');
const Client = pg.Client;
pg.types.setTypeParser(1082, 'text', function (val) {
  return val;
});

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'docker',
  database: 'postgres'
});

const connect = async () => {
  console.log('Connecting to database');
  try {
    await client.connect()
  } catch (e) {
    console.log('error', e);
  }
};

connect()

async function fetchData() {
  await client.query(`create table if not exists Users (
          id serial primary key,
          username varchar not null,
          password varchar not null
);`)

  const res = await client.query('select * from Users');
  console.log(res.rows);
  return res;
}

router.get('/deleteCal', async (req, res) => {
  await client.query('DROP TABLE if exists Calendar');
  res.end();
});

router.get('/deleteUsers', async (req, res) => {
  console.log('Deleting table calendar');
  await client.query('DROP TABLE Users');
  res.end();
});

router.get('/create', async (req, res) => {
  await client.query(`create table if not exists Users (
      id serial primary key,
      username varchar not null unique,
      password varchar not null,
      name varchar not null
);`)

  res.end();
  console.log('Sent list of items');
});

router.get('/createuser', async (req, res) => {
  await client.query(`insert into Users(username, password, name) values ('Salt', 'sales', 'salt')`);
  await client.query(`insert into Users(username, password, name) values ('Andre', 'brazil', 'André Tauffer')`);
  await client.query(`insert into Users(username, password, name) values ('Chris', 'sweden', 'Christian Sandström')`);
  await client.query(`insert into Users(username, password, name) values ('Christoffer', 'england', 'Christoffer Sundqvist')`);
  await client.query(`insert into Users(username, password, name) values ('Blocket', 'money', 'Blocket Co.')`);
  req.end();
});


router.get('/insertCal', async (req, res) => {
  console.log('Creating table calendar..');
  const resdb = await client.query(`create table if not exists Calendar (
    id serial primary key,
    date date not null,
    year integer,
    month integer,
    day integer,
    weekday integer,
    availability integer,
    customer integer
);`);

  await client.query(`insert into Calendar(date) values (generate_series('2019-01-01'::date,'2023-12-31'::date,'1 day'::interval))`);
  res.send(resdb);
});

router.get('/genData', async (req, res) => {
  console.log('Generates calendar data');
  await client.query('DROP TABLE Users');
  const resdb = await client.query(`create table if not exists Calendar (
    id serial primary key,
    date date not null,
    year integer,
    month integer,
    day integer,
    weekday integer,
    availability integer,
    customer integer
);`);

  await client.query("update Calendar set weekday = extract(isodow from date)");
  await client.query("update Calendar set day = date_part('day', date)");
  await client.query("update Calendar set month = date_part('month', date)");
  await client.query("update Calendar set year = date_part('year', date)");
  await client.query("update Calendar set availability = 1");

  res.send(201);
});

router.get('/initCal', async (req, res) => {
  //delete existing calendar
  await client.query('DROP TABLE if exists Calendar');

  //creates an empty calendar
  await client.query(`create table if not exists Calendar (
    id serial primary key,
    date date not null,
    year integer,
    month integer,
    day integer,
    weekday integer,
    availability integer,
    customer integer
);`);
  await client.query(`insert into Calendar(date) values (generate_series('2019-01-01'::date,'2023-12-31'::date,'1 day'::interval))`);

  //populate calendar
  await client.query("update Calendar set weekday = extract(isodow from date)");
  await client.query("update Calendar set day = date_part('day', date)");
  await client.query("update Calendar set month = date_part('month', date)");
  await client.query("update Calendar set year = date_part('year', date)");
  await client.query("update Calendar set availability = 1");

  //return calendar
  const calendarData = await client.query('select * from Calendar');

  res.send(201, calendarData);
});

router.get('/getCal', async (req, res) => {
  console.log('Selects * from calendar');
  const resa = await client.query('select * from Calendar');
  console.log(resa.rows[0].date)
  res.send(resa.rows);
});

router.get('/getList', async (req, res) => {
  var list = await fetchData();
  res.send(list.rows);
  console.log('Sent list of items');
});

module.exports = router;