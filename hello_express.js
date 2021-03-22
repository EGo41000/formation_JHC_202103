
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log(req.headers);
  //console.log(req.params);
  console.log(req.query);
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello World!');
})

app.put('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('requete PUT')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

