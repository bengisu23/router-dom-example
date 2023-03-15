import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const navigate = useNavigate();
    const [bookName,setBookName]=useState("");
    const [writerName,setWriterName]=useState("");
    const [bookGenre,setBookGenre]=useState("");
    const [pageNumber,setPageNumber]=useState("");
    const [books,setBooks]=useState(null)

    const saveBook = (event)=> {
        event.preventDefault();
        if (
            bookName==="" ||
            writerName==="" ||
            bookGenre==="" ||
            pageNumber==="" 
        ){
            alert("fill all of them")
            return
        }
        const hasBook=books.find(item=>item.bookName ===bookName)
        if(hasBook !==undefined){
          alert(`${bookName} already have this book`)
          return
        }
        const newbook = {
            id:String(new Date().getTime()),
            bookName:bookName,
            writerName:writerName,
            bookGenre:bookGenre,
            pageNumber:pageNumber
        };
        axios.post("http://localhost:3004/books",newbook)
        .then((res)=>{
            navigate("/")
        })
        .catch((err)=>{});
    };
    useEffect(()=>{
        axios.get("http://localhost:3004/books")
        .then(res=>{
            setBooks(res.data)
        })
        .catch(err=>{
    
        })
      },[])
      if(books === null){
        return null
      }
  return (
    <div>
      <Header page={"add-book"} />
      <div className="container my-5">
        <form onSubmit={saveBook}>
          <div className="mb-3">
            <label htmlFor="bookName" className="form-label">
              book name
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
              writer Name
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
              book genre
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
              page Number
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
            <button className="btn btn-success w-50" type="submit">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
