import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Select from 'react-select';

export const GET_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

function Authors({ show }) {
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, { refetchQueries: [{ query: GET_AUTHORS }] });
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');

  if (!show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: </p>;

  async function submit(e) {
    e.preventDefault();
    await editAuthor({ variables: { name, setBornTo: +birthYear } });
    setName('');
    setBirthYear('');
  }

  const selectOptions = data.allAuthors.map(author => {
    return {
      value: author.name,
      label: author.name,
    };
  });

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map(({ name, born, bookCount, id }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{born}</td>
              <td>{bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthYear</h2>
      <form onSubmit={submit}>
        <Select
          value={{ label: name }}
          onChange={({ value }) => setName(value)}
          options={selectOptions}
        />
        <div>
          born
          <input value={birthYear} onChange={({ target }) => setBirthYear(target.value)} />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  );
}

export default Authors;
