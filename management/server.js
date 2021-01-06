const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const concurrently = require('concurrently');

const connection = mysql.createConnection({
  host : conf.host,
  user : conf.user,
  password : conf.password,
  port : conf.port,
  database : conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest : './upload'})

//클라이언트가 api 경로에 접속하면  
app.get('/api/customers', (req, res)=>{
    connection.query(
      "SELECT * FROM CUSTOMER WHERE isDeleted=0",
      (err, rows, fields) => {
        res.send(rows);
      }
    )
})

//image 폴더에서 upload 폴더로 접근 할 수 있도록 
//사용자는 image란 폴더로 접근 -> 실제 서버의 위치는 upload 와 매핑 
app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req,res)=>{
  let sql = 'INSERT INTO CUSTOMER VALUES(null,?,?,?,?,?,now(),0)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;

  // console.log(name);
  // console.log(image);
  // console.log(birthday);
  // console.log(gender);
  // console.log(job);

  let parmas = [image, name, birthday, gender, job];

  connection.query(sql, parmas, 
    (err, rows, fields)=>{
      res.send(rows);
      console.log(err);
    }
  );

});

app.delete('/api/customers/:id', (req, res)=>{
  let sql = 'UPDATE CUSTOMER SET isDeleted=1 WHERE id=?';
  let params = [req.params.id];
  connection.query(sql, params, 
    (err, row, fields)=>{
      res.send(row);
      console.log(err);
    })
})

app.listen(port, ()=>console.log( `Listening on port ${port}` ));
