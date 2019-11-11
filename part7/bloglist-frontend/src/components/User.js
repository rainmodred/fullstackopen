import React from 'react';
import { Header, List } from 'semantic-ui-react';

export default function User({ user }) {
  if (!user) return null;
  return (
    <>
      <Header as="h2">{user.username}</Header>
      <List bulleted>
        <List.Header>added blogs</List.Header>
        {user.blogs.map(blog => (
          <List.Item key={blog.id}>{blog.title}</List.Item>
        ))}
      </List>
    </>
  );
}
