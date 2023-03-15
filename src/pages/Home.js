import React, { useEffect,useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import ListBooks from "../components/ListBooks";

const Home = () => {
    const[didUpdate,setDidUpdate]=useState(false)

    const [books,setBooks]=useState(null)
  useEffect(() => {
    axios
      .get("http://localhost:3004/books")
      .then((res) => {
        setBooks(res.data)
      })
      .catch((err) => {});
  },[didUpdate]);

  if(books===null) return null

  return (
    <div>
      <Header page={"home"} />
      <ListBooks books={books} didUpdate={didUpdate} setDidUpdate={setDidUpdate} />
    </div>
  );
};

export default Home;
