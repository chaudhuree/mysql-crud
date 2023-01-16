const express = require('express');
const mysql= require('mysql');
const app = express();
const port = 5000;

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
  const query = 'INSERT INTO books (`title`,`descr`,`cover`) VALUES (?)';
  const values = ['book two', 'some more desc', 'image two'];
  db.query(query, [values], (err, result)=>{
    if(err) throw err;
    res.status(201).json(result);
  })
})

app.listen(port, () => {console.log(`app listening on port ${port}`)});