import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

const ClearGroupDialog = class ClearGroupDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSave() {
    const { selectedItem } = this.props
    this.props.clearGroupAction(selectedItem._id);
    this.props.handleClose();
  }

  render() {
    const { selectedItem } = this.props;

    const actions = [
      <FlatButton
        label="No"
        primary
        onTouchTap={e => this.props.handleClose(e)}
      />,
      <FlatButton
        label="Yes"
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
        <div>
          You you like to remove all users from group { selectedItem.name } ?
        </div>
      </Dialog>
    );
  }
};

ClearGroupDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  handleClose: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  clearGroupAction: React.PropTypes.func.isRequired,
  selectedItem: React.PropTypes.any.isRequired,
};

export default ClearGroupDialog;
