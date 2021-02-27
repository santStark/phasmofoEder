var express = require('express');
var app = express();

app.use(express.static(__dirname +'/src'));

app.listen(8080, ()=> {
  console.log('Game escutando na porta 8080!');
});
