//create web server
const express = require('express');
const app = express();

//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//create in-memory database
const comments = [];

//get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

//create a comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.status(201).json(comment);
});

//start server
app.listen(3000, () => {
  console.log('Server started');
});