import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Blog from './Blog';
import Notification from './Notification';

function Blogs({ blogs, loggedUsername }) {
  if (!blogs || blogs.length === 0) return <h2>blogs</h2>;
  console.log(blogs);
  return (
    <>
      <h2>blogs</h2>
      <Notification />
      {blogs.map(blog => (
        <div key={blog.id} className="blog">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
        // <Blog blog={blog} creator={blog.user.username === loggedUsername} key={blog.id} />
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
