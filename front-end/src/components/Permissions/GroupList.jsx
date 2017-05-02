import React, { Component } from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';


import GroupListItem from './GroupListItem';
import AddPermissionDialog from './Dialogs/AddPermissionDialog';
import ClearPermissionsDialog from './Dialogs/ClearPermissionsDialog';
import ClearGroupDialog from './Dialogs/ClearGroupDialog';

const GroupList = class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogAddPermission: { title: '', selectedGroup: {}, open: false },
      dialogClearPermissions: { title: '', selectedGroup: {}, open: false },
      dialogClearGroup: { title: '', selectedGroup: {}, open: false },
    };
  }

  dialogAddPermissionOpen(selectedGroup) {
    const { dialogAddPermission } = this.state;
    dialogAddPermission.title = `Add permission to ${selectedGroup.name}`;
    dialogAddPermission.selectedGroup = selectedGroup;
    dialogAddPermission.open = true;

    this.setState({ dialogAddPermission });
  }

  dialogAddPermissionClose() {
    const { dialogAddPermission } = this.state;
    dialogAddPermission.title = '';
    dialogAddPermission.selectedGroup = {};
    dialogAddPermission.open = false;

    this.setState({ dialogAddPermission });
  }

  dialogClearPermissionsOpen(selectedGroup) {
    const { dialogClearPermissions } = this.state;
    dialogClearPermissions.title = 'Clear permissions';
    dialogClearPermissions.selectedGroup = selectedGroup;
    dialogClearPermissions.open = true;

    this.setState({ dialogClearPermissions });
  }

  dialogClearPermissionsClose() {
    const { dialogClearPermissions } = this.state;
    dialogClearPermissions.title = '';
    dialogClearPermissions.selectedGroup = {};
    dialogClearPermissions.open = false;

    this.setState({ dialogClearPermissions });
  }

  dialogClearGroupOpen(selectedGroup) {
    const { dialogClearGroup } = this.state;
    dialogClearGroup.title = 'Clear group';
    dialogClearGroup.selectedGroup = selectedGroup;
    dialogClearGroup.open = true;

    this.setState({ dialogClearGroup });
  }

  dialogClearGroupClose() {
    const { dialogClearGroup } = this.state;
    dialogClearGroup.title = '';
    dialogClearGroup.selectedGroup = {};
    dialogClearGroup.open = false;

    this.setState({ dialogClearGroup });
  }

  render() {
    const { dialogAddPermission, dialogClearPermissions, dialogClearGroup } = this.state;
    const { permissions, objects, groups,
      addPermissionToGroup, clearGroupPermissions, clearGroup } = this.props;

    // if (groups.loading.fetch) {
    //  return <CircularProgress />;
    // }

    return (
      <div>
        <List>
          <Subheader>Groups</Subheader>
          {
            groups.list.map(group => (
              <GroupListItem
                key={group._id}
                group={group}
                dialogAddPermissionOpen={selectedGroup =>
                  this.dialogAddPermissionOpen(selectedGroup)}
                dialogClearPermissionsOpen={selectedGroup =>
                  this.dialogClearPermissionsOpen(selectedGroup)}
                dialogClearGroupOpen={selectedGroup =>
                  this.dialogClearGroupOpen(selectedGroup)}
              />
            ))
          }
        </List>
        <AddPermissionDialog
          modal={false}
          open={dialogAddPermission.open}
          handleClose={() => this.dialogAddPermissionClose()}
          title={dialogAddPermission.title}
          permissions={permissions}
          objects={objects}
          addPermissionAction={addPermissionToGroup}
          selectedItem={dialogAddPermission.selectedGroup}
        />
        <ClearPermissionsDialog
          modal={false}
          open={dialogClearPermissions.open}
          handleClose={() => this.dialogClearPermissionsClose()}
          title={dialogClearPermissions.title}
          permissions={permissions}
          objects={objects}
          clearPermissionsAction={clearGroupPermissions}
          selectedItem={dialogClearPermissions.selectedGroup}
        />
        <ClearGroupDialog
          modal={false}
          open={dialogClearGroup.open}
          handleClose={() => this.dialogClearGroupClose()}
          title={dialogClearGroup.title}
          permissions={permissions}
          objects={objects}
          clearGroupAction={clearGroup}
          selectedItem={dialogClearGroup.selectedGroup}
        />
      </div>
    );
  }
};

GroupList.propTypes = {
  permissions: React.PropTypes.any.isRequired,
  objects: React.PropTypes.any.isRequired,
  groups: React.PropTypes.any.isRequired,
  addPermissionToGroup: React.PropTypes.func.isRequired,
  clearGroupPermissions: React.PropTypes.func.isRequired,
  clearGroup: React.PropTypes.func.isRequired,
};

export default GroupList;
