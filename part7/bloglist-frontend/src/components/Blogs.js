import React from 'react';
import { connect } from 'react-redux';
import Blog from './Blog';
import Notification from './Notification';

function Blogs({ blogs, loggedUsername }) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      {blogs.map(blog => (
        <Blog blog={blog} creator={blog.user.username === loggedUsername} key={blog.id} />
      ))}
    </>
  );
}

function mapStateToProps(state) {
  return {
    blogs: state.blogs,
    loggedUsername: state.login.token.username,
  };
}

export default connect(mapStateToProps)(Blogs);
