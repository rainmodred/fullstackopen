import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import BlogsPage from './pages/BlogsPage';
import Menu from './components/Menu';
import LoginFrom from './components/LoginFrom';
import Blog from './components/Blog';
import Users from './components/Users';
import User from './components/User';
import { initBlogs } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import { logout, setUser } from './reducers/loginReducer';
import { initUsers } from './reducers/userReducer';

function App({ user, users, blogs, initBlogs, initUsers, setUser, logout }) {
  useEffect(() => {
    try {
      initUsers();
      initBlogs();
    } catch (error) {
      console.log(error);
    }
  }, [initBlogs, initUsers]);

  useEffect(() => {
    setUser();
  }, [setUser]);

  const userById = id => users.find(user => user.id === id);
  const blogById = id => blogs.find(blog => blog.id === id);

  return (
    <Router>
      <Menu />
      <Route exact path="/" render={() => <BlogsPage />} />
      <Route
        exact
        path="/login"
        render={() => (user.token ? <Redirect to="/" /> : <LoginFrom />)}
      />
      <Route exact path="/users" render={() => <Users />} />
      <Route path="/users/:id" render={({ match }) => <User user={userById(match.params.id)} />} />
      <Route
        path="/blogs/:id"
        render={({ match }) => (
          <Blog
            blog={blogById(match.params.id)}
            creator={user.token ? user.token.username : null}
          />
        )}
      />
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    blogs: state.blogs,
    user: state.login,
    users: state.users,
  };
}

const mapDispatchToProps = {
  initBlogs,
  initUsers,
  setUser,
  logout,
  setNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
