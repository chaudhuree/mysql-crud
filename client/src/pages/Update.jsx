import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Updadte() {
  const [book,setBook]=React.useState({
    title:'',
    descr:'',
    price:'',
    cover:''
  })
  const {id}=useParams('id')
  console.log(id)
  const navigate = useNavigate()
  const handelChange=(e)=>{
    const {name,value}=e.target
    setBook({...book,[name]:value})
    console.log(book)
  }
  const handelClick=async (e)=>{
    e.preventDefault()
   try {
    await axios.put('http://localhost:5000/books/'+id,book)
    navigate('/')
   } catch (error) {
    console.log(error.message)
   }
    
  }


  return (
    <div>
      <h1>Update the Book</h1>
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

export default Updadte