import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Users({ users }) {
  return (
    <div>
      <h2>Users</h2>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => {
            return (
              <Table.Row key={user.id}>
                <Table.Cell>
                  <Link to={`users/${user.id}`}>{user.username}</Link>
                </Table.Cell>
                <Table.Cell>{user.blogs.length}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(Users);
