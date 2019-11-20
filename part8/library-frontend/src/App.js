import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/react-hooks';
import { GET_BOOKS, LOGIN, BOOK_ADDED, GET_USER } from './graphql/queries';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommended from './components/Recommended';

function App() {
  const { loading, error, data } = useQuery(GET_USER);
  const [login] = useMutation(LOGIN, {
    onError: handleError,
  });
  const client = useApolloClient();
  const [page, setPage] = useState('books');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) {
      setToken(token);
    }
  }, []);

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

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      alert(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

  if (loading) return <p>Loading...</p>;

  function handleError(error) {
    setErrorMessage(error.graphQLErrors[0].message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  }

  function logout() {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }

  const errorNotification = () =>
    errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>;

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommended')}>recommended</button>}
        {token ? (
          <button onClick={() => logout()}>logout</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      {errorNotification()}
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <Recommended show={page === 'recommended'} favoriteGenre={data && data.me.favoriteGenre} />
      <NewBook show={page === 'add'} handleError={handleError} client={client} />
      <LoginForm show={page === 'login'} login={login} setToken={setToken} />
    </div>
  );
}

export default App;
