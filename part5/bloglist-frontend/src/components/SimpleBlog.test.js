import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import SimpleBlog from './SimpleBlog';

describe('SimpleBlog', () => {
  test('renders content', () => {
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    };

    const component = render(<SimpleBlog blog={blog} />);

    expect(component.container.querySelector('.simpleblog-title')).toHaveTextContent(
      'React patterns',
    );
    expect(component.container.querySelector('.simpleblog-likes')).toHaveTextContent(
      'blog has 7 likes',
    );
  });
  test('clicking the button calls event handler twice', () => {
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    };

    const mockHandler = jest.fn();

    const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />);

    const button = getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
