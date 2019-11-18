import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export const GET_BOOKS = gql`
  {
    allBooks {
      title
      author {
        name
      }
      published
      id
    }
  }
`;

function Books({ show }) {
  const { loading, error, data } = useQuery(GET_BOOKS);

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
              <td>{author.name}</td>
              <td>{published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
