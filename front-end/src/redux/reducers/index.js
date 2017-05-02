import { combineReducers } from 'redux';

import groups from './groupsReducer';
import users from './usersReducer';
import objects from './objectsReducer';
import permissions from './permissionsReducer';

export default combineReducers({
  groups,
  users,
  objects,
  permissions,
});
