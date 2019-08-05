import React from "react";
import { graphql } from "react-apollo";

import { getBookQuery } from "../queries";

const BookDetails = props => {
  const display = () => {
    const book = props.data.book;
    if (book) {
      return (
        <div className="book_details">
          <h3>{book.name}</h3>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <h4>Books written by {book.author.name}</h4>
          <ul>
            {book.author.books.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <div className="book_details">
        <h3>No Book Selected</h3>
      </div>
    );
  };

  return display();
};

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
