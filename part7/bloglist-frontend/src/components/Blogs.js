import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Segment, Header } from 'semantic-ui-react';

import Notification from './Notification';

function Blogs({ blogs }) {
  if (!blogs || blogs.length === 0) return <h2>blogs</h2>;

  return (
    <>
      <Header as="h2">Blogs</Header>
      <Notification />
      {blogs.map(blog => (
        <Segment key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </Segment>
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
