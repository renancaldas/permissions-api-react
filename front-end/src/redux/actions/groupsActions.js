import axios from 'axios';
import constants from '../../constants';

const entityName = 'GROUPS';
const actions = {
  fetch: 'FETCH',
  addPermission: 'ADD_PERMISSION',
  clearPermissions: 'CLEAR_PERMISSIONS',
  clearGroup: 'CLEAR',
};

const fetchGroupsAndDispatchLocal = (dispach) => {
  dispach({ type: `${entityName}_${actions.fetch}` });

  axios.get(`${constants.BASE_URL}/groups`)
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

export function fetchGroupsAndDispatch(dispach) {
  return fetchGroupsAndDispatchLocal(dispach);
}

export function fetchGroups() {
  return (dispach) => { fetchGroupsAndDispatchLocal(dispach); };
}

export function addPermissionToGroup(groupId, code, objectId) {
  return (dispach) => {
    dispach({ type: `${entityName}_${actions.addPermission}_LOADING` });

    axios.put(`${constants.BASE_URL}/group/${groupId}/permission/${code}/object/${objectId}`)
      .then((response) => {
        dispach({
          type: `${entityName}_${actions.addPermission}_SUCCESS`,
          payload: response.data.data,
        });
        fetchGroupsAndDispatchLocal(dispach);
      })
      .catch((error) => {
        dispach({
          type: `${entityName}_${actions.addPermission}_ERROR`,
          payload: error,
        });
      });
  };
}

export function clearGroupPermissions(groupId) {
  return (dispach) => {
    dispach({ type: `${entityName}_${actions.clearPermissions}_LOADING` });

    axios.delete(`${constants.BASE_URL}/group/${groupId}/permissions`)
      .then((response) => {
        dispach({
          type: `${entityName}_${actions.clearPermissions}_SUCCESS`,
          payload: response.data.data,
        });
        fetchGroupsAndDispatchLocal(dispach);
      })
      .catch((error) => {
        dispach({
          type: `${entityName}_${actions.clearPermissions}_ERROR`,
          payload: error,
        });
      });
  };
}

export function clearGroup(groupId) {
  return (dispach) => {
    dispach({ type: `${entityName}_${actions.clearGroup}_LOADING` });

    axios.delete(`${constants.BASE_URL}/group/${groupId}/clear`)
      .then((response) => {
        dispach({
          type: `${entityName}_${actions.clearGroup}_SUCCESS`,
          payload: response.data.data,
        });
        fetchGroupsAndDispatchLocal(dispach);
      })
      .catch((error) => {
        dispach({
          type: `${entityName}_${actions.clearGroup}_ERROR`,
          payload: error,
        });
      });
  };
}
