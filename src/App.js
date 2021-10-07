import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState(null);

	const blogFormRef = useRef();

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

	const handleLogin = async (userCreds) => {
		try {
			const user = await loginService.login(userCreds);
			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
			setUser(user);
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

	const handleBlogCreation = async (newBlog) => {
		try {
			blogService.setToken(user.token);

			const blog = await blogService.create(newBlog);
			setBlogs(blogs.concat(blog));
			setNotification({
				type: 'success',
				message: `Added new blog: ${blog.title} by ${blog.author}`,
			});

			setTimeout(() => {
				setNotification(null);
				blogFormRef.current.toggleVisibility()
			}, 3000);
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
			<LoginForm onSubmit={handleLogin}>
				<Notification data={notification} />
			</LoginForm>
		);
	};

	const createBlogForm = () => {
		return (
			<Togglable buttonLabel="create new blog" ref={blogFormRef}>
				<BlogForm onSubmit={handleBlogCreation}>
					<Notification data={notification} />
				</BlogForm>
			</Togglable>
		);
	};

	if (user === null) {
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
