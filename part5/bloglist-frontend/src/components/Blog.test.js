import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Blog from './Blog';

describe('Blog', () => {
  let component;
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    likes: 7,
    url: 'https://reactpatterns.com/',
    user: '5db2ecddc82afd24ac38e8e2',
  };
  beforeEach(() => {
    component = render(<Blog blog={blog} />);
  });
  test('at start display only title and author', () => {
    const div = component.container.querySelector('.blog-title');

    expect(div).toHaveTextContent('React patterns Michael Chan');
    expect(component.container).not.toHaveTextContent('https://reactpatterns.com/');
  });
  test('when the blog post is clicked, the other information of the blog post becomes visible', () => {
    const div = component.container.querySelector('.blog-title');
    fireEvent.click(div);
    expect(component.container).toHaveTextContent('https://reactpatterns.com/');
  });
});
