import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import { Card } from 'material-ui/Card';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGroups, addPermissionToGroup, clearGroupPermissions, clearGroup } from '../../redux/actions/groupsActions';
import { fetchUsers, addPermissionToUser, addUserToGroup, clearUserPermissions } from '../../redux/actions/usersActions';
import { fetchPermissions } from '../../redux/actions/permissionsActions';
import { fetchObjects } from '../../redux/actions/objectsActions';

import './Home.css';
import Groups from '../Groups/Groups';
import Permissions from '../Permissions/Permissions';

const Home = class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: {
        open: false,
        message: '',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { toast } = this.state;

    const isUserActionDone = nextProps.users.lastActionResponse
      && (!nextProps.users.loading.addPermission
      || !nextProps.users.loading.addToGroup
      || !nextProps.users.loading.clearPermissions);

    const isGroupActionDone = nextProps.groups.lastActionResponse
      && (!nextProps.groups.loading.addPermission
      || !nextProps.groups.loading.clearPermissions);

    if (isUserActionDone || isGroupActionDone) {
      toast.open = true;
      toast.message = isUserActionDone
        ? nextProps.users.lastActionResponse
        : nextProps.groups.lastActionResponse;

      this.setState({ toast });
    }
  }

  componentWillMount() {
    this.props.fetchGroups();
    this.props.fetchUsers();
    this.props.fetchPermissions();
    this.props.fetchObjects();
  }

  handleRequestClose() {
    const { toast } = this.state;
    toast.open = false;

    this.setState({ toast });
  }

  render() {
    const { users, objects, groups, permissions } = this.props;
    return (
      <Card>
      <div className="row-space-between">
        <Groups
          loading={groups.loading}
          groups={groups.list}
          error={groups.error}
        />
        <Permissions
          permissions={permissions}
          groups={groups}
          users={users}
          objects={objects}

          addPermissionToGroup={this.props.addPermissionToGroup}
          addPermissionToUser={this.props.addPermissionToUser}
          addUserToGroup={this.props.addUserToGroup}
          clearUserPermissions={this.props.clearUserPermissions}
          clearGroupPermissions={this.props.clearGroupPermissions}
          clearGroup={this.props.clearGroup}
        />

        <Snackbar
          open={this.state.toast.open}
          message={this.state.toast.message}
          autoHideDuration={4000}
          onRequestClose={this.handleToastClose}
        />
      </div>
      </Card>
    );
  }
};

// Redux
const mapStateToProps = (state) => {
  const props = {
    groups: state.groups,
    permissions: state.permissions,
    users: state.users,
    objects: state.objects,
  };

  return props;
};

const mapDispatchToProps = (dispatch) => {
  const props = {
    fetchGroups: bindActionCreators(fetchGroups, dispatch),
    fetchPermissions: bindActionCreators(fetchPermissions, dispatch),
    fetchObjects: bindActionCreators(fetchObjects, dispatch),
    fetchUsers: bindActionCreators(fetchUsers, dispatch),

    addPermissionToUser: bindActionCreators(addPermissionToUser, dispatch),
    addPermissionToGroup: bindActionCreators(addPermissionToGroup, dispatch),
    addUserToGroup: bindActionCreators(addUserToGroup, dispatch),
    clearUserPermissions: bindActionCreators(clearUserPermissions, dispatch),
    clearGroupPermissions: bindActionCreators(clearGroupPermissions, dispatch),
    clearGroup: bindActionCreators(clearGroup, dispatch),
  };

  return props;
};

Home.defaultProps = {
  groups: {},
  permissions: {},
  users: {},
  objects: {},
};

Home.propTypes = {
  fetchGroups: React.PropTypes.func.isRequired,
  addPermissionToGroup: React.PropTypes.func.isRequired,

  fetchUsers: React.PropTypes.func.isRequired,
  addPermissionToUser: React.PropTypes.func.isRequired,
  addUserToGroup: React.PropTypes.func.isRequired,
  clearUserPermissions: React.PropTypes.func.isRequired,
  clearGroupPermissions: React.PropTypes.func.isRequired,
  clearGroup: React.PropTypes.func.isRequired,

  fetchPermissions: React.PropTypes.func.isRequired,
  fetchObjects: React.PropTypes.func.isRequired,

  groups: React.PropTypes.any.isRequired,
  permissions: React.PropTypes.any.isRequired,
  users: React.PropTypes.any.isRequired,
  objects: React.PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
