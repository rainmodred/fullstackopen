import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Notification from './Notification';

function Blogs({ blogs }) {
  if (!blogs || blogs.length === 0) return <h2>blogs</h2>;

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      {blogs.map(blog => (
        <div key={blog.id} className="blog">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </>
  );
}

function mapStateToProps(state) {
  return {
    blogs: state.blogs,
  };
}

export default connect(mapStateToProps)(Blogs);
