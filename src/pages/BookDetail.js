import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";

const BookDetail = () => {
  const params = useParams();
  const [book, setbook] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3004/books/${params.bookId}`)
      .then((res) => {
        setbook(res.data);
      })
      .catch((err) => {});
  });
  if (book === null) return null;
  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>kitap Bilgileri</span>
            <Link to={"/"} className="badge bg-primary">
              Geri
            </Link>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>book name:</b> {book.bookName}
            </li>
            <li className="list-group-item">
              <b> writer Name:</b> {book.writerName}
            </li>
            <li className="list-group-item">
              <b>genre :</b> {book.bookGenre}
            </li>
            <li className="list-group-item">
              <b>page:</b> {book.pageNumber}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
