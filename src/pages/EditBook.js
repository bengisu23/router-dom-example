import React,{useEffect, useState} from 'react'

import Header from '../components/Header'

import { useParams,useNavigate } from 'react-router-dom'
import  axios  from 'axios'

const EditBook=()=> {
    const [willEditBook, setWillEditBook]=useState(null)
    const [bookName,setBookName]=useState("")
    const [bookGenre,setBookGenre]=useState("")
    const [pageNumber,setPageNumber]=useState("")
    const [writerName,setWriterName]=useState("")
    const params=useParams()
    const navigate=useNavigate()
   
    useEffect(()=>{
        axios.get(`http://localhost:3004/books/${params.bookId}`)
        .then((res)=>{
            setWillEditBook(res.data)
            setBookGenre(res.data.bookGenre);
            setBookName(res.data.bookName)
            setPageNumber(res.data.pageNumber);
            setWriterName(res.data.writerName);
        })
        .catch((err)=>{
            console.log(err)
        })
    },[]);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            bookGenre === "" ||
            bookName === "" ||
            pageNumber === "" ||
            writerName === "" 
        ) {
            alert("must be filled");
            return null;
        }
        const editedBook = {
            id:params.bookId,
            bookName:bookName,
            bookGenre:bookGenre,
            writerName:writerName,
            pageNumber:pageNumber,
        };
        axios.put(`http://localhost:3004/books/${params.bookId}`, editedBook)
        .then((res)=>{
            navigate("/");
        })
        .catch((err)=> {
            alert("there is a error");
        });
    };


    if (willEditBook === null) {
        return null;
    }
  return (
    <div>
      <Header page={"edit-book"} />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="bookName" className="form-label">
              Book name
            </label>
            <input
              type="text"
              className="form-control"
              id="bookName"
              placeholder="monte cristo"
              value={bookName}
              onChange={(event)=> setBookName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="writerName" className="form-label">
              Writer Name
            </label>
            <input
              type="text"
              className="form-control"
              id="writerName"
              placeholder="brendon sanderson"
              value={writerName}
             onChange={(event)=> setWriterName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bookGenre" className="form-label">
              Book genre
            </label>
            <input
              type="text"
              className="form-control"
              id="bookGenre"
              placeholder="fantasy" 
              value={bookGenre}
              onChange={(event)=> setBookGenre(event.target.value)}            
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pageNumber" className="form-label">
              Page Number
            </label>
            <input
              type="text"
              className="form-control"
              id="pageNumber"
              placeholder="38564"   
              value={pageNumber}
              onChange={(event)=> setPageNumber(event.target.value)}          
            />
          </div>
          <div className="d-flex justify-content-center my-5">
            <button className="btn btn-danger w-50" type="submit">
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBook
