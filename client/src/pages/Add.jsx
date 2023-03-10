import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Add() {
  const [book,setBook]=React.useState({
    title:'',
    descr:'',
    price:'',
    cover:''
  })
  // navigate to go to homepage again after adding new book
  const navigate = useNavigate()
  // set book state
  const handelChange=(e)=>{
    const {name,value}=e.target
    setBook({...book,[name]:value})
    console.log(book)
  }
  // post book to server
  const handelClick=async (e)=>{
    e.preventDefault()
   try {
    await axios.post('http://localhost:5000/books',book)
    navigate('/')
   } catch (error) {
    console.log(error.message)
   }    
  }


  return (
    <div>
      <h1>Add Book</h1>
      <div className="form">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" onChange={handelChange}/>
        <label htmlFor="descr">Description</label>
        <input type="text" name="descr" onChange={handelChange}/>
        <label htmlFor="cover">Cover</label>
        <input type="text" name="cover" onChange={handelChange}/>
        <label htmlFor="price">Price</label>
        <input type="number" name="price" onChange={handelChange}/>
     
        <button onClick={handelClick}>Submit</button>
      </div>
    </div>
  )
}

export default Add