const express = require('express');
const mysql= require('mysql');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
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
  const {title, descr, cover,price} = req.body;
  const query = 'INSERT INTO books (`title`,`descr`,`cover`,`price`) VALUES (?)';
  const values = [title, descr, cover,price];
  db.query(query, [values], (err, result)=>{
    if(err) throw err;
    res.status(201).json({"status":'success', "message":"book is created"});
  })
})

// delete book
app.delete('/books/:id', (req, res)=>{
  const {id} = req.params;
  const query = 'DELETE FROM books WHERE id=?';
  db.query(query, [id], (err, result)=>{
    if(err) throw err;
    res.status(200).json({"status":'success', "message":"book is deleted"});
  })
})

app.listen(port, () => {console.log(`app listening on port ${port}`)});