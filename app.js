const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const Photo = require('./models/Photo');
const PhotoController = require('./controllers/photoControllers');
const PageController = require('./controllers/pageController');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/pcat-dev');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {methods:['POST','GET']}));

app.get('/', PhotoController.getAllPhotos);

app.get('/photos/:id', PhotoController.getPhoto);

app.post('/photos', PhotoController.createPhoto);

app.put('/photos/:id', PhotoController.updatePhoto);

app.delete('/photos/:id', PhotoController.deletePhoto)

app.get('/about', PageController.getAboutPage);

app.get('/add', PageController.getAddPage);

app.get('/photos/edit/:id', PageController.getEditPage);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
