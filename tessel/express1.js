
const express = require('express')
const app = express()
const port = 3000
var os = require('os');

var networkInterfaces = os.networkInterfaces();

console.log(networkInterfaces);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

