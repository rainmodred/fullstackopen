import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import BooksList from './BooksList';
import { GET_BOOKS } from '../graphql/queries';

function Books({ show }) {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [genre, setGenre] = useState('');

  if (!show) {
    return null;
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: </p>;

  const reducer = (acc, curr) => acc.concat(curr.genres.map(genre => genre));
  const genres = [...new Set(data.allBooks.reduce(reducer, []))];

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      )}
      <BooksList books={data.allBooks} genre={genre} />
      <div>
        {genres.map(genre => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Books;
