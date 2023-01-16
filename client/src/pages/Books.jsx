import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Books() {
  const [books, setBooks] = React.useState([])
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await axios.get('http://localhost:5000/books')
        console.log({ books })
        setBooks(books.data)
      } catch (error) {

      }
    }
    fetchBooks()
  }, [])
  return (
    <div>
      <h1>Book List</h1>

      {books.map((book, index) => {
        return <div key={index}>
          {book.cover && <img src={book.cover} alt={book.title} />}
          <h2>{book.title}</h2>
          <p>{book.descr}</p>
          <span>{book.price ? book.price : <p>price</p>}</span>
        </div>
      })
      }
      <button><Link to='/add'>add new book</Link></button>
    </div>
  )
}
