const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/pcat-dev')

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 3000;

app.get('/', async(req, res) => {
  const photos = await Photo.find({})
  res.render('index',{
    photos
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.get('/photos/:id', async(req, res) => {
  const photo = await Photo.findById(req.params.id)
  res.render('photo', {
    photo
  })
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body)
  res.redirect('/');  
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
