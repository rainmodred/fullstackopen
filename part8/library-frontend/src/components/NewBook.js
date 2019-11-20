import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_BOOK, GET_BOOKS, GET_AUTHORS } from '../graphql/queries';

function NewBook({ show, handleError, client }) {
  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    update: (store, response) => {
      updateCacheWith(response.data.addBook);
    },
    refetchQueries: [{ query: GET_AUTHORS }],
  });
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) => {
      return set.map(book => book.id).includes(object.id);
    };

    const dataInStore = client.readQuery({ query: GET_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook);
      client.writeQuery({
        query: GET_BOOKS,
        data: dataInStore,
      });
    }
  };

  if (!show) {
    return null;
  }

  async function submit(e) {
    e.preventDefault();

    await addBook({ variables: { title, published: Number.parseInt(published), author, genres } });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  }

  function addGenre() {
    setGenres(genres.concat(genre));
    setGenre('');
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
}

export default NewBook;
