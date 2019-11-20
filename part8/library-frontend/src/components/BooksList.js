import React from 'react';

export default function BookList({ books, genre }) {
  function filterByGenre() {
    if (genre === '') return books;
    return books.filter(book => {
      if (book.genres.includes(genre)) {
        return book;
      }
    });
  }

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {filterByGenre().map(({ title, id, author, published }) => (
          <tr key={id}>
            <td>{title}</td>
            <td>{author.name}</td>
            <td>{published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
