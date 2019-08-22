const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

console.log(`Instant message client server started. http://localhost:${port}/`);

app.get('/',function(req,res){
    console.log("new client request");
    res.sendFile(path.join(__dirname + '/client.html'));
});

app.listen(port);