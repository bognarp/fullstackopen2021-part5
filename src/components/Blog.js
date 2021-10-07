import React, { useState } from 'react';

const Blog = (props) => {
	const blog = props.blog;
	const user = props.user;
	const [expanded, setExpanded] = useState(false);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const visible = { display: expanded ? 'none' : '' };
	const hidden = { display: expanded ? '' : 'none' };

	const toggleExpansion = () => {
		setExpanded(!expanded);
	};

	const addLike = () => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1,
		};
		props.onLike(updatedBlog);
	};

	const handleDelete = () => {
		props.onRemove(blog);
	};

	return (
		<div style={blogStyle}>
			<div style={visible}>
				{blog.title} {blog.author}
				<button onClick={toggleExpansion}>view</button>
			</div>
			<div style={hidden}>
				<button onClick={toggleExpansion}>hide</button> <br />
				<strong>Title</strong>: {blog.title} <br />
				<strong>Author</strong>: {blog.author} <br />
				<strong>Url</strong>: {blog.url} <br />
				<strong>Likes</strong>: {blog.likes}{' '}
				<button onClick={addLike}>like</button> <br />
				{user.username === blog.user.username ? (
					<button onClick={handleDelete}>remove</button>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Blog;
