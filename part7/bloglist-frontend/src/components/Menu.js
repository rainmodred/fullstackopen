import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu as NavMenu } from 'semantic-ui-react';
import { logout } from '../reducers/loginReducer';

function Menu({ user, logout }) {
  return (
    <NavMenu>
      <NavMenu.Item>
        <Link to="/">Blogs</Link>
      </NavMenu.Item>
      <NavMenu.Item>
        <Link to="/users">Users</Link>
      </NavMenu.Item>
      <NavMenu.Item>
        {user.token ? <span>{user.token.username} logged in</span> : <Link to="/login">Login</Link>}
      </NavMenu.Item>
      {user.token && (
        <NavMenu.Item name="logout" onClick={logout}>
          logout
        </NavMenu.Item>
      )}
    </NavMenu>
  );
}

function mapStateToProps(state) {
  return {
    user: state.login,
  };
}

export default connect(
  mapStateToProps,
  { logout },
)(Menu);
