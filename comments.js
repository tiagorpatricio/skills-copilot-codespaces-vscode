//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;
const filePath = path.join(__dirname, 'comments.json');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/comments', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file.');
      return;
    }
    res.send(data);
  });
});

app.post('/comments', (req, res) => {
  if (!req.body || !req.body.comment) {
    res.status(400).send('Invalid request.');
    return;
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file.');
      return;
    }

    const comments = JSON.parse(data);
    comments.push(req.body.comment);

    fs.writeFile(filePath, JSON.stringify(comments), err => {
      if (err) {
        res.status(500).send('Error writing file.');
        return;
      }
      res.send('Comment added.');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});