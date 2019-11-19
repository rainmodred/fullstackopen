import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import BooksList from './BooksList';
import { GET_BOOKS } from './Books';

export default function Recommended({ show, favoriteGenre }) {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (!show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: </p>;

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {favoriteGenre}</p>
      <BooksList books={data.allBooks} genre={favoriteGenre} />
    </div>
  );
}
