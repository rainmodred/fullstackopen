import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';
jest.mock('./services/blogs');

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />);

    await waitForElement(() => component.getByText('login'));
    expect(component.container).not.toHaveTextContent('blogs');
  });
  test('if user logged, blogs are rendered', async () => {
    const user = {
      username: 'test',
      token: 'test12345',
      name: 'test test',
    };
    localStorage.setItem('loggedUser', JSON.stringify(user));

    const component = render(<App />);

    await waitForElement(() => component.getByText('blogs'));
    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(2);
  });
});
