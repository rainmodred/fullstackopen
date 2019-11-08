import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
    </div>
  );
}
