import React, { useState, Fragment } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom"
import Metadata from "../layout/Metadata";

const Search = ({ history }) => {

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    console.log(keyword)
    if (keyword.trim()) {
        navigate(`/products/${keyword}`); // Trim the keyword
    } else {
        navigate("/products");
    }
  };

  return (
    <Fragment>

      <Metadata title={"search a Product -- Ecommerce "}></Metadata>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          className="box1"
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)} // Trim the keyword
        />
        <input className="box2" type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
