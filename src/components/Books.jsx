import React from 'react';
import { axiosDelete } from '../services/utils/axios';

const Books = ({ books }) => {
  const deleteBook = (id) => {
    axiosDelete(id);
  };

  return (
    <div>
      <h1>Books from API:</h1>
      {books.map((book) => {
        return (
          <div key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.body}</p>
            <button
              value={book.id}
              onClick={(e) => {
                if (window.confirm('Are you sure you want to delele this?')) {
                  deleteBook(e.currentTarget.value);
                }
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Books;
