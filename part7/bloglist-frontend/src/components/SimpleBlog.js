import React from 'react';

export default function SimpleBlog({ blog, onClick }) {
  const { title, author, likes } = blog;
  return (
    <div className="simpleblog">
      <div className="simpleblog-title">
        {title} {author}
      </div>
      <div className="simpleblog-likes">
        blog has {likes} likes
        <button onClick={onClick}>like</button>
      </div>
    </div>
  );
}
