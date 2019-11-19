import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [login] = useMutation(LOGIN, {
    onError: handleError,
  });

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
        {token ? (
          <button onClick={() => logout()}>logout</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      {errorNotification()}
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} handleError={handleError} />
      <LoginForm show={page === 'login'} login={login} setToken={setToken} />
    </div>
  );
}

export default App;
