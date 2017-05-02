import React, { Component } from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';

import UserListItem from './UserListItem';
import AddPermissionDialog from './Dialogs/AddPermissionDialog';
import AddToGroupDialog from './Dialogs/AddToGroupDialog';
import ClearPermissionsDialog from './Dialogs/ClearPermissionsDialog';

const UserList = class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogAddPermission: { title: '', selectedUser: {}, open: false },
      dialogAddToGroup: { title: '', selectedUser: {}, open: false },
      dialogClearPermissions: { title: '', selectedUser: {}, open: false },
    };
  }

  dialogAddPermissionOpen(selectedUser) {
    const { dialogAddPermission } = this.state;
    dialogAddPermission.title = `Add permission to ${selectedUser.name}`;
    dialogAddPermission.selectedUser = selectedUser;
    dialogAddPermission.open = true;

    this.setState({ dialogAddPermission });
  }

  dialogAddPermissionClose() {
    const { dialogAddPermission } = this.state;
    dialogAddPermission.title = '';
    dialogAddPermission.selectedUser = {};
    dialogAddPermission.open = false;

    this.setState({ dialogAddPermission });
  }

  dialogAddToGroupOpen(selectedUser) {
    console.log('dialogAddToGroupOpen', selectedUser)
    const { dialogAddToGroup } = this.state;
    dialogAddToGroup.title = `Add ${selectedUser.name} to group`;
    dialogAddToGroup.selectedUser = selectedUser;
    dialogAddToGroup.open = true;

    this.setState({ dialogAddToGroup });
  }

  dialogAddToGroupClose() {
    const { dialogAddToGroup } = this.state;
    dialogAddToGroup.title = '';
    dialogAddToGroup.selectedUser = {};
    dialogAddToGroup.open = false;

    this.setState({ dialogAddToGroup });
  }

  dialogClearPermissionsOpen(selectedUser) {
    const { dialogClearPermissions } = this.state;
    dialogClearPermissions.title = `Clear permissions`;
    dialogClearPermissions.selectedUser = selectedUser;
    dialogClearPermissions.open = true;

    this.setState({ dialogClearPermissions });
  }

  dialogClearPermissionsClose() {
    const { dialogClearPermissions } = this.state;
    dialogClearPermissions.title = '';
    dialogClearPermissions.selectedUser = {};
    dialogClearPermissions.open = false;

    this.setState({ dialogClearPermissions });
  }

  render() {
    const { dialogAddPermission, dialogAddToGroup, dialogClearPermissions } = this.state;
    const { permissions, objects, users, groups, addPermissionToUser,
      addUserToGroup, clearUserPermissions } = this.props;

    // if (users.loading.fetch) {
    //   return <CircularProgress />;
    // }

    return (
      <div>
        <List>
          <Subheader>Users</Subheader>
          {
            users.list.map(user =>
              <UserListItem
                key={user._id}
                user={user}
                dialogAddPermissionOpen={selectedUser =>
                  this.dialogAddPermissionOpen(selectedUser)}
                dialogAddToGroupOpen={selectedUser =>
                  this.dialogAddToGroupOpen(selectedUser)}
                dialogClearPermissionsOpen={selectedUser =>
                  this.dialogClearPermissionsOpen(selectedUser)}
              />,
            )
          }
        </List>
        <AddPermissionDialog
          modal={false}
          open={dialogAddPermission.open}
          handleClose={() => this.dialogAddPermissionClose()}
          title={dialogAddPermission.title}
          permissions={permissions}
          objects={objects}
          addPermissionAction={addPermissionToUser}
          selectedItem={dialogAddPermission.selectedUser}
        />
        <AddToGroupDialog
          modal={false}
          open={dialogAddToGroup.open}
          handleClose={() => this.dialogAddToGroupClose()}
          title={dialogAddToGroup.title}
          groups={groups}
          addToGroupAction={addUserToGroup}
          selectedItem={dialogAddToGroup.selectedUser}
        />
        <ClearPermissionsDialog
          modal={false}
          open={dialogClearPermissions.open}
          handleClose={() => this.dialogClearPermissionsClose()}
          title={dialogClearPermissions.title}
          permissions={permissions}
          objects={objects}
          clearPermissionsAction={clearUserPermissions}
          selectedItem={dialogClearPermissions.selectedUser}
        />
      </div>
    );
  }
};

UserList.propTypes = {
  permissions: React.PropTypes.any.isRequired,
  groups: React.PropTypes.any.isRequired,
  objects: React.PropTypes.any.isRequired,
  users: React.PropTypes.any.isRequired,
  addPermissionToUser: React.PropTypes.func.isRequired,
  addUserToGroup: React.PropTypes.func.isRequired,
  clearUserPermissions: React.PropTypes.func.isRequired,
};

export default UserList;
