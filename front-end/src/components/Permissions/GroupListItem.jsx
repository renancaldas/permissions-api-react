import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import { grey400 } from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const GroupListItem = class GroupListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClickAddPermission(group) {
    this.props.dialogAddPermissionOpen(group);
  }

  handleClickClearGroup(group) {
    this.props.dialogClearGroupOpen(group);
  }

  handleClickClearPermissions(group) {
    this.props.dialogClearPermissionsOpen(group);
  }

  render() {
    const { group } = this.props;

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
        <MenuItem onClick={() => this.handleClickAddPermission(group)}>
          Add permission to group</MenuItem>
        <MenuItem onClick={() => this.handleClickClearGroup(group)}>
          Clear group</MenuItem>
        <MenuItem onClick={() => this.handleClickClearPermissions(group)}>
          Clear permissions</MenuItem>
      </IconMenu>
    );

    return (
      <ListItem
        primaryText={group.name}
        secondaryText={group.permissions.map(permission => permission.permissionCode).join(', ')}
        rightIconButton={rightIconMenu}
      />
    );
  }
};

GroupListItem.defaultProps = {
  group: {},
};

GroupListItem.propTypes = {
  group: React.PropTypes.any.isRequired,
  dialogAddPermissionOpen: React.PropTypes.func.isRequired,
  dialogClearPermissionsOpen: React.PropTypes.func.isRequired,
  dialogClearGroupOpen: React.PropTypes.func.isRequired,
};

export default GroupListItem;
