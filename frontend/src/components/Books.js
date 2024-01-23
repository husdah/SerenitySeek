import React from 'react'
import {useState,useEffect} from 'react'


export default function Books() {
    const [books,setBooks]=useState([]);

useEffect(()=>{
    const fetchBooks=async()=>{
        const response=await fetch("/api/companies")
        const json=await response.json();
        console.log(json)
        if(response.ok)
        {
            setBooks(json);
          
        }
    }
    fetchBooks();
   },[])

 console.log(books)
  return (
    <div className="Books">

    </div>
  )
}
