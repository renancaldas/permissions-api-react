import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import { grey400 } from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const UserListItem = class UserListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClickAddPermission(user) {
    this.props.dialogAddPermissionOpen(user);
  }

  handleClickAddToGroup(user) {
    this.props.dialogAddToGroupOpen(user);
  }

  handleClickClearPermissions(user) {
    this.props.dialogClearPermissionsOpen(user);
  }

  render() {
    const { user } = this.props;

    const iconButtonElement = (
      <IconButton
        touch
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={() => this.handleClickAddPermission(user)}>
          Add permission to user</MenuItem>
        <MenuItem onClick={() => this.handleClickAddToGroup(user)}>Add user to group</MenuItem>
        <MenuItem onClick={() => this.handleClickClearPermissions(user)}>Clear permissions</MenuItem>
      </IconMenu>
    );

    return (
      <ListItem
        primaryText={user.name}
        secondaryText={user.permissions.map(permission => permission.permissionCode).join(', ')}
        rightIconButton={rightIconMenu}
      />
    );
  }
};

UserListItem.defaultProps = {
  index: 0,
  user: {},
  openModal: () => {},
};

UserListItem.propTypes = {
  user: React.PropTypes.any.isRequired,
  dialogAddPermissionOpen: React.PropTypes.func.isRequired,
  dialogAddToGroupOpen: React.PropTypes.func.isRequired,
  dialogClearPermissionsOpen: React.PropTypes.func.isRequired,
};

export default UserListItem;
