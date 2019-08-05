import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries";

import BookDetails from "./BookDetails";

const BookList = props => {
  const [selectedBook, setselectedBook] = useState(null);

  const handleClick = id => {
    setselectedBook(id);
  };

  return (
    <div className="book_container">
      <ul>
        {props.data.loading ? (
          <h1>Loading...</h1>
        ) : (
          props.data.books.map(book => (
            <li
              className="book_item"
              key={book.id}
              onClick={() => handleClick(book.id)}
            >
              {book.name}
            </li>
          ))
        )}
      </ul>

      <BookDetails bookId={selectedBook} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
