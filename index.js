const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5230;
const server = express();
server.use(cors());

server.use(bodyParser.json());


server.post('/post', (req, res) => {
  const payload = req.body.str;

  const regex = /\b[a-zA-Z0-9_]+\b/g
  const words = (payload.match(regex) || []).length;

  if (words >= 8) {
    res.send('200 Ok Status');
  } else {
    res.send('Not Acceptable');
  }
});

server.listen(port, () => {
  console.log(`server listen on http://localhost:5230`);
});
