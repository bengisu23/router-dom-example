import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

const ListBooks = ({ books, didUpdate, setDidUpdate }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const deleteBook = (id) => {
    if (window.confirm("are you sure you want to delete") === true) {
      axios
        .delete(`http://localhost:3004/books/${id}`)
        .then((res) => {
          console.log(res);
          setDidUpdate(!didUpdate);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    var tempArray = books.filter(
      (item) =>
        item.bookName.toLowerCase().includes(searchText.toLowerCase()) ===
          true ||
        item.bookGenre.toLowerCase().includes(searchText.toLowerCase()) === true
        
    );
    setFilteredBooks(tempArray);
  }, [searchText]);
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <input
          className="form-control"
          type="text"
          placeholder="Aramak istediğiniz kitap bilgisini girin..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <Link className="btn btn-primary w-50" to={"/add-book"}>
          Add Book
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Book Id</th>
            <th scope="col">Book name</th>
            <th scope="col">Writer name</th>
            <th scope="col">genre</th>
            <th scope="col">page count</th>
            <th scope="col">transaction</th>
          </tr>
        </thead>
        <tbody>
          {books.lenght === 0 ? (
            <tr>
              <td className="text-center" colSpan={5}>
                There is no book right now.
              </td>
            </tr>
          ) : (
            <>
              {filteredBooks.map((book, index) => (
                <tr key={book.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{book.bookName}</td>
                  <td>{book.writerName}</td>
                  <td>{book.bookGenre}</td>
                  <td>{book.pageNumber}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        onClick={() => deleteBook(book.id)}
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/edit-book/${book.id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Update
                      </Link>
                      <Link to={`/book-detail/${book.id}`} className="btn btn-sm btn-outline-secondary">Detail</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListBooks;
