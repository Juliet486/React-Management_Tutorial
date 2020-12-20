const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//클라이언트가 api 경로에 접속하면  
app.get('/api/hello', (req, res)=>{
    res.send({message: 'Hello Express!'});
});

app.listen(port, ()=>console.log( `Listening on port ${port}` ));

