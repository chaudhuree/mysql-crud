import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Books() {
  const [books, setBooks] = React.useState([])
  // fetch books functin
  const fetchBooks = async () => {
    try {
      const books = await axios.get('http://localhost:5000/books')
      // console.log({ books })
      setBooks(books.data)
    } catch (error) {

    }
  }
  // fetch book first time
  useEffect(() => {
    fetchBooks()
  }, [])

  // delete book, function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`)
      const newBooks = books.filter(book => book.id !== id)
      setBooks(newBooks)
      // window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }

  // delete all books function
  const deleteAll = async () => {
    try {

      await axios.delete('http://localhost:5000/alldelete')
      setBooks([])
    } catch (error) {
      console.log(error.message)
    }
  }

  return (<div className="container">
      <h1 className='heading'>Book List</h1>

    <div className="books">
      <div className="books"></div>
      {books.map((book, index) => {
        return <div key={index} className='book'>
          {book.cover && <img src={book.cover} alt={book.title} />}
          <h2>{book.title}</h2>
          <p>{book.descr}</p>
          <span>{book.price ? book.price : <p>price</p>}</span>
          <div>
            <button className="delete-btn btn"onClick={() => handleDelete(book.id)}>delete</button>
            <button className="update-btn btn"><Link to={`/update/${book.id}`}>update</Link></button>
          </div>
        </div>
      })
      }

    </div>
     <div className="buttons">
     <button className="add-new-book btn"><Link to='/add'>add new book</Link></button>
      <button className="delete-all btn" onClick={deleteAll}>delete all books</button>
    
     </div>
    </div>
  )
}
