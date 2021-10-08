import React, { useState } from 'react';

const BlogForm = (props) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const handleBlogCreation = (event) => {
    event.preventDefault();
    props.onSubmit({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    });
    setBlogAuthor('');
    setBlogTitle('');
    setBlogUrl('');
  };

  const handleTitleChange = ({ target }) => {
    setBlogTitle(target.value);
  };
  const handleAuthorChange = ({ target }) => {
    setBlogAuthor(target.value);
  };
  const handleUrlChange = ({ target }) => {
    setBlogUrl(target.value);
  };

  return (
    <div>
      <h2>Create new blog</h2>
      {props.children}
      <form onSubmit={handleBlogCreation}>
        <div>
					title
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
					author
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
					url
          <input
            type="text"
            value={blogUrl}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
