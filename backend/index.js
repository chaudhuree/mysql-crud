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

app.get('/books', (req, res)=>{
  const query = 'SELECT * FROM books';
  db.query(query, (err, result)=>{
    if(err) throw err;
    res.json(result);
  })
})

app.listen(port, () => {console.log(`app listening on port ${port}`)});