import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';

const Groups = class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loading, groups } = this.props;

    // if (loading.fetch) {
    //   return <CircularProgress />;
    // }

    return (
      <div className="width-50">
        <List>
          <Subheader>Groups</Subheader>
          {
            groups.map(group => (
              <ListItem
                key={group.name}
                primaryText={group.name}
                secondaryText={group.users.map(user => user.name).join(', ')}
              />
            ))
          }
        </List>
      </div>
    );
  }
};

Groups.propTypes = {
  loading: React.PropTypes.any.isRequired,
  groups: React.PropTypes.any.isRequired,
};

export default Groups;
