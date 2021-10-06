import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState(null);
	const [blogTitle, setBlogTitle] = useState('');
	const [blogAuthor, setBlogAuthor] = useState('');
	const [blogUrl, setBlogUrl] = useState('');

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setNotification({
				type: 'error',
				message: exception.response.data.error,
			});

			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	const handleLogout = () => {
		setUser(null);
		window.localStorage.removeItem('loggedBlogAppUser');
	};

	const handleBlogCreation = async (event) => {
		event.preventDefault();

		try {
			blogService.setToken(user.token);

			const newBlog = {
				title: blogTitle,
				author: blogAuthor,
				url: blogUrl,
			};

			const blog = await blogService.create(newBlog);
			setNotification({
				type: 'success',
				message: `Added new blog: ${blog.title} by ${blog.author}`,
			});

			setTimeout(() => {
				setNotification(null);
			}, 5000);

			setBlogs([...blogs, blog]);
			setBlogAuthor('');
			setBlogTitle('');
			setBlogUrl('');
		} catch (exception) {
			setNotification({
				type: 'error',
				message: exception.response.data.error,
			});

			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	const loginForm = () => {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification data={notification} />
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							type="text"
							value={username}
							name="Username"
							onChange={({ target }) => {
								setUsername(target.value);
							}}
						/>
					</div>
					<div>
						password
						<input
							type="password"
							value={password}
							name="Password"
							onChange={({ target }) => {
								setPassword(target.value);
							}}
						/>
					</div>

					<button type="submit">login</button>
				</form>
			</div>
		);
	};

	const createBlogForm = () => {
		return (
			<>
				<h2>Create new blog</h2>
				<Notification data={notification} />
				<form onSubmit={handleBlogCreation}>
					<div>
						title
						<input
							type="text"
							value={blogTitle}
							name="Title"
							onChange={({ target }) => {
								setBlogTitle(target.value);
							}}
						/>
					</div>
					<div>
						author
						<input
							type="text"
							value={blogAuthor}
							name="Author"
							onChange={({ target }) => {
								setBlogAuthor(target.value);
							}}
						/>
					</div>
					<div>
						url
						<input
							type="text"
							value={blogUrl}
							name="Url"
							onChange={({ target }) => {
								setBlogUrl(target.value);
							}}
						/>
					</div>
					<button type="submit">create</button>
				</form>
			</>
		);
	};

	if (user == null) {
		return loginForm();
	}

	return (
		<div>
			logged in as {user.name}
			<button onClick={handleLogout}>logout</button>
			{createBlogForm()}
			<h2>Blogs</h2>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
