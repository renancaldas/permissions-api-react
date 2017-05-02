import axios from 'axios';
import constants from '../../constants';

import { fetchGroupsAndDispatch } from './groupsActions';

const entityName = 'USERS';
const actions = {
  fetch: 'FETCH',
  addPermission: 'ADD_PERMISSION',
  addToGroup: 'ADD_GROUP',
  clearPermissions: 'CLEAR_PERMISSIONS',
};

const fetchUsersAndDispach = (dispach) => {
  dispach({ type: `${entityName}_${actions.fetch}` });

  axios.get(`${constants.BASE_URL}/users`)
    .then((response) => {
      dispach({
        type: `${entityName}_${actions.fetch}_FULFILLED`,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      dispach({
        type: `${entityName}_${actions.fetch}_ERROR`,
        payload: error,
      });
    });
};

export function fetchUsers() {
  return (dispach) => { fetchUsersAndDispach(dispach); };
}

export function addPermissionToUser(userId, code, objectId) {
  return (dispach) => {
    dispach({ type: `${entityName}_${actions.addPermission}_LOADING` });

    axios.put(`${constants.BASE_URL}/user/${userId}/permission/${code}/object/${objectId}`)
      .then((response) => {
        dispach({
          type: `${entityName}_${actions.addPermission}_SUCCESS`,
          payload: response.data.data,
        });
        fetchUsersAndDispach(dispach);
      })
      .catch((error) => {
        dispach({
          type: `${entityName}_${actions.addPermission}_ERROR`,
          payload: error,
        });
      });
  };
}

export function addUserToGroup(userId, groupId) {
  return (dispach) => {
    dispach({ type: `${entityName}_${actions.addToGroup}_LOADING` });

    axios.put(`${constants.BASE_URL}/group/${groupId}/user/${userId}`)
      .then((response) => {
        dispach({
          type: `${entityName}_${actions.addToGroup}_SUCCESS`,
          payload: response.data.data,
        });
        fetchGroupsAndDispatch(dispach);
      })
      .catch((error) => {
        dispach({
          type: `${entityName}_${actions.addToGroup}_ERROR`,
          payload: error,
        });
      });
  };
}

export function clearUserPermissions(userId) {
  return (dispach) => {
    dispach({ type: `${entityName}_${actions.clearPermissions}_LOADING` });

    axios.delete(`${constants.BASE_URL}/user/${userId}/permissions`)
      .then((response) => {
        dispach({
          type: `${entityName}_${actions.clearPermissions}_SUCCESS`,
          payload: response.data.data,
        });
        fetchUsersAndDispach(dispach);
      })
      .catch((error) => {
        dispach({
          type: `${entityName}_${actions.clearPermissions}_ERROR`,
          payload: error,
        });
      });
  };
}
