var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname +'/src'));

/*app.get('/', (req, res) => {
  let index = fs.readFileSync('index.html');
  res.send(index);
});*/

app.listen(8080, ()=> {
  console.log('Game escutando na porta 8080!');
});