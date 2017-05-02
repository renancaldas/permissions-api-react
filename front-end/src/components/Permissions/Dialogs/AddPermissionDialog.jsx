import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

const AddPermissionDialog = class AddPermissionDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPermission: '',
      selectedObject: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { permissions, objects } = nextProps;
    const defaultPermission = ((permissions && permissions.list.length > 0) ? permissions.list[0].code : '');
    const defaultObject = ((objects && objects.list.length > 0) ? objects.list[0]._id : '');

    this.setState({
      selectedPermission: defaultPermission,
      selectedObject: defaultObject,
    });
  }

  handlePermissionChange(event, index, value) {
    console.log(value)
    this.setState({ selectedPermission: value });
  }

  handleObjectChange(event, index, value) {
    console.log(value)
    this.setState({ selectedObject: value });
  }

  handleSave() {
    const { selectedItem } = this.props
    const { selectedPermission, selectedObject } = this.state;
    console.log('Save', selectedItem._id, selectedPermission, selectedObject);
    this.props.addPermissionAction(selectedItem._id, selectedPermission, selectedObject);
    this.props.handleClose();
  }

  render() {
    const { permissions, objects } = this.props;
    const { selectedPermission, selectedObject } = this.state;

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={e => this.props.handleClose(e)}
      />,
      <FlatButton
        label="Confirm"
        primary
        keyboardFocused
        onTouchTap={e => this.handleSave(e)}
      />,
    ];

    return (
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleClose}
      >
        <DropDownMenu
          value={selectedPermission}
          onChange={(event, index, value) => this.handlePermissionChange(event, index, value)}
        >
          {
              permissions.list.map(permission => (
                <MenuItem
                  key={permission.code}
                  value={permission.code}
                  primaryText={permission.code}
                />
              ))
          }
        </DropDownMenu>

        <DropDownMenu
          value={selectedObject}
          onChange={(event, index, value) => this.handleObjectChange(event, index, value)}
        >
          {
              objects.list.map(object => (
                <MenuItem
                  key={object._id}
                  value={object._id}
                  primaryText={object.name}
                />
              ))
          }
        </DropDownMenu>
      </Dialog>
    );
  }
};

AddPermissionDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  handleClose: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  permissions: React.PropTypes.any.isRequired,
  objects: React.PropTypes.any.isRequired,
  addPermissionAction: React.PropTypes.func.isRequired,
  selectedItem: React.PropTypes.any.isRequired,
};

export default AddPermissionDialog;
