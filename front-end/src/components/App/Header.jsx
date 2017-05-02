import React from 'react';
import AppBar from 'material-ui/AppBar';

const Header = props => (
  <AppBar
    title={props ? props.title : ''}
    iconElementLeft={<div />}
  />
);

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default Header;
