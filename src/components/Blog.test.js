import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  let mockHandler;

  beforeEach(() => {
    const user = {
      username: 'tesztelek',
    };
    const blog = {
      title: 'Blog title is visible',
      author: 'Blog author is visible',
      url: 'Blog url is hidden',
      likes: 'Likes are hidden',
      user,
    };

    mockHandler = jest.fn();

    component = render(
      <Blog
        blog={blog}
        user={user}
        onLike={mockHandler}
        onRemove={mockHandler}
      />
    );
  });

  test('renders only the blog title and author by default', () => {
    const visibleDiv =
      component.container.querySelector('.simpleView');
    const hiddenDiv =
      component.container.querySelector('.extendedView');

    expect(visibleDiv).toHaveTextContent(
      'Blog title is visible Blog author is visible'
    );
    expect(hiddenDiv).toHaveStyle('display: none;');
  });

  test('renders blog url, number of likes when view button has been clicked', () => {
    const viewButton = component.getByText('view');
    const hiddenDiv =
      component.container.querySelector('.extendedView');

    fireEvent.click(viewButton);

    expect(hiddenDiv).not.toHaveStyle('display: none;');
    expect(hiddenDiv).toHaveTextContent('Blog url is hidden');
    expect(hiddenDiv).toHaveTextContent('Likes are hidden');
  });

  test('clicking the like button calls the event handler', () => {
    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
