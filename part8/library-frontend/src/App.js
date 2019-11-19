import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommended from './components/Recommended';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const GET_USER = gql`
  {
    me {
      favoriteGenre
      username
    }
  }
`;

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: </p>;

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
      <NewBook show={page === 'add'} handleError={handleError} />
      <LoginForm show={page === 'login'} login={login} setToken={setToken} />
    </div>
  );
}

export default App;
