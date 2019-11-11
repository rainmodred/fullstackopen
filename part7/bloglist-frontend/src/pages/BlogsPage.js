import React from 'react';
import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogFrom';
import Blogs from '../components/Blogs';

export default function BlogsPage() {
  const blogFormRef = React.createRef();
  function toggleVisibility() {
    blogFormRef.current.toggleVisibility();
  }

  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>
      <Blogs />
    </>
  );
}
