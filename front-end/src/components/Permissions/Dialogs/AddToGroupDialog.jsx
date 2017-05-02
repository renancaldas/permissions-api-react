import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

const AddToGroupDialog = class AddToGroupDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { groups } = nextProps;
    const defaultGroup = ((groups && groups.list.length > 0) ? groups.list[0]._id : '');

    this.setState({
      selectedGroup: defaultGroup,
    });
  }

  handleGroupChange(event, index, value) {
    console.log(value)
    this.setState({ selectedGroup: value });
  }

  handleSave() {
    const { selectedItem } = this.props;
    const { selectedGroup } = this.state;
    this.props.addToGroupAction(selectedItem._id, selectedGroup);
    this.props.handleClose();
  }

  render() {
    const { groups } = this.props;
    const { selectedGroup } = this.state;

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
          value={selectedGroup}
          onChange={(event, index, value) => this.handleGroupChange(event, index, value)}
        >
          {
              groups.list.map(group => (
                <MenuItem
                  key={group._id}
                  value={group._id}
                  primaryText={group.name}
                />
              ))
          }
        </DropDownMenu>
      </Dialog>
    );
  }
};

AddToGroupDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  handleClose: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  groups: React.PropTypes.any.isRequired,
  addToGroupAction: React.PropTypes.func.isRequired,
  selectedItem: React.PropTypes.any.isRequired,
};

export default AddToGroupDialog;
