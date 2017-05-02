import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import GroupList from './GroupList';
import UserList from './UserList';

const Permissions = class Permissions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { groups, users, permissions, objects,
      addPermissionToUser, addPermissionToGroup,
      addUserToGroup, clearUserPermissions, clearGroupPermissions, clearGroup } = this.props;

    return (
      <div className="width-50">
        <GroupList
          objects={objects}
          permissions={permissions}
          groups={groups}
          addPermissionToGroup={addPermissionToGroup}
          clearGroupPermissions={clearGroupPermissions}
          clearGroup={clearGroup}
        />
        <Divider />
        <UserList
          objects={objects}
          permissions={permissions}
          users={users}
          groups={groups}
          addPermissionToUser={addPermissionToUser}
          addUserToGroup={addUserToGroup}
          clearUserPermissions={clearUserPermissions}
        />
      </div>
    );
  }
};

Permissions.propTypes = {
  groups: React.PropTypes.any.isRequired,
  permissions: React.PropTypes.any.isRequired,
  users: React.PropTypes.any.isRequired,
  objects: React.PropTypes.any.isRequired,

  addPermissionToGroup: React.PropTypes.func.isRequired,
  addPermissionToUser: React.PropTypes.func.isRequired,
  addUserToGroup: React.PropTypes.func.isRequired,
  clearUserPermissions: React.PropTypes.func.isRequired,
  clearGroupPermissions: React.PropTypes.func.isRequired,
  clearGroup: React.PropTypes.func.isRequired,
};

export default Permissions;
