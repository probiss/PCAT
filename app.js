const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
