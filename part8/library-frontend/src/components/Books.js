import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_BOOK = gql`
  {
    allBooks {
      title
      author
      published
      id
    }
  }
`;

function Books({ show }) {
  const { loading, error, data } = useQuery(GET_BOOK);

  if (!show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: </p>;

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map(({ title, id, author, published }) => (
            <tr key={id}>
              <td>{title}</td>
              <td>{author}</td>
              <td>{published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
