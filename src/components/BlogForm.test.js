import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('calls event handler with the right values when form has been submitted', () => {
    const blogCreation = jest.fn();
    const component = render(<BlogForm onSubmit={blogCreation} />);

    const form = component.container.querySelector('form');
    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');

    fireEvent.change(title, {
      target: { value: 'Test Title' },
    });
    fireEvent.change(author, {
      target: { value: 'Test Author' },
    });
    fireEvent.change(url, {
      target: { value: 'Test URL' },
    });
    fireEvent.submit(form);

    expect(blogCreation.mock.calls).toHaveLength(1);
    expect(blogCreation.mock.calls[0][0]).toStrictEqual({
      author: 'Test Author',
      title: 'Test Title',
      url: 'Test URL',
    });
  });
});
