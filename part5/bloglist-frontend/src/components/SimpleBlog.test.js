import React from 'react';

import { render } from '@testing-library/react';

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
});
