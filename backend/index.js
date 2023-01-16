const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());
// connect to mysql
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodebooklist'
});

// connection check
app.get('/', (req, res) => {
  res.send('connected to backend')
})

// get all books
app.get('/books', (req, res) => {
  const query = 'SELECT * FROM books';
  db.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  })
})


// create book
app.post('/books', (req, res) => {
  const { title, descr, cover, price } = req.body;
  const query = 'INSERT INTO books (`title`,`descr`,`cover`,`price`) VALUES (?)';
  const values = [title, descr, cover, price];
  db.query(query, [values], (err, result) => {
    if (err) throw err;
    res.status(201).json({ "status": 'success', "message": "book is created" });
  })
})


// delete book
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM books WHERE id=?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.status(200).json({ "status": 'success', "message": "book is deleted" });
  })
})


// update book
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, descr, cover, price } = req.body;
  const query = 'UPDATE books SET title=?, descr=?, cover=?,price=? WHERE id=?';
  const values = [title, descr, cover, price,id];
  db.query(query, values, (err, result) => {
    if (err) throw err;
    res.status(200).json({ "status": 'success', "message": "book is updated" });
  })
})


// delete all books
app.delete('/alldelete', (req, res) => {
  const query = 'TRUNCATE TABLE books';
  db.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json({ "status": 'success', "message": "all books are deleted" });
  })
})

app.listen(port, () => { console.log(`app listening on port ${port}`) });