const express = require('express');
const mysql= require('mysql');
const app = express();
const port = 5000;

app.use(express.json());
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodebooklist'
});

app.get('/', (req, res)=>{
    res.send('this is backend')
})

// get all books
app.get('/books', (req, res)=>{
  const query = 'SELECT * FROM books';
  db.query(query, (err, result)=>{
    if(err) throw err;
    res.status(200).json(result);
  })
})

// create book
app.post('/books', (req, res)=>{
  const {title, descr, cover} = req.body;
  const query = 'INSERT INTO books (`title`,`descr`,`cover`) VALUES (?)';
  const values = [title, descr, cover];
  db.query(query, [values], (err, result)=>{
    if(err) throw err;
    res.status(201).json({"status":'success', "message":"book is created"});
  })
})

app.listen(port, () => {console.log(`app listening on port ${port}`)});