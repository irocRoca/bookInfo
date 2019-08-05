import React, { useState } from "react";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries";
import { graphql, compose } from "react-apollo";

const AddBook = props => {
  const [values, setValues] = useState({ name: "", genre: "", authorId: "" });

  // console.log(document.querySelector("#authorId").options());

  const handleSubmit = e => {
    e.preventDefault();
    props.addBook({
      variables: {
        ...values
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    setValues({ name: "", genre: "", authorId: "" });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="form_control">
      <form id="form" onSubmit={handleSubmit}>
        <div className="form_contain">
          <label htmlFor="bookName">Book Name</label>
          <input
            id="bookName"
            name="name"
            type="text"
            onChange={handleChange}
            value={values.name}
          />
        </div>
        <div className="form_contain">
          <label>Genre</label>
          <input
            name="genre"
            type="text"
            value={values.genre}
            onChange={handleChange}
          />
        </div>
        <div className="form_contain">
          <label>Author</label>
          <select id="authorId" name="authorId" onChange={handleChange}>
            <option defaultValue hidden>
              Select Author
            </option>
            {props.getAuthors.loading
              ? null
              : props.getAuthors.authors.map(author => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
          </select>
        </div>
        <button>Add</button>
      </form>
    </div>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthors" }),
  graphql(addBookMutation, { name: "addBook" })
)(AddBook);
