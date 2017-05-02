const defaultState = {
  loading: {
    fetch: false,
    addPermission: false,
    clearPermissions: false,
  },
  list: [],
  error: null,
  lastActionResponse: null,
};

const entityName = 'GROUPS';
const actions = {
  fetch: 'FETCH',
  addPermission: 'ADD_PERMISSION',
  clearPermissions: 'CLEAR_PERMISSIONS',
  clearGroup: 'CLEAR',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {

    // Fetch
    // ----------------------------------------------------------//
    case `${entityName}_${actions.fetch}`: {
      const { loading } = state;
      loading.fetch = true;
      return {
        ...state,
        loading,
      };
    }
    case `${entityName}_${actions.fetch}_REJECTED`: {
      const { loading } = state;
      loading.fetch = false;
      return {
        ...state,
        loading,
        error: action.payload,
      };
    }
    case `${entityName}_${actions.fetch}_FULFILLED`: {
      const { loading } = state;
      loading.fetch = false;
      return {
        ...state,
        loading,
        list: action.payload,
      };
    }

    // Add permissions
    // ----------------------------------------------------------//
    case `${entityName}_${actions.addPermission}_LOADING`: {
      const { loading } = state;
      loading.addPermission = true;
      return {
        ...state,
        loading,
      };
    }
    case `${entityName}_${actions.addPermission}_SUCCESS`: {
      const { loading } = state;
      loading.addPermission = false;
      return {
        ...state,
        loading,
        lastActionResponse: action.payload,
      };
    }
    case `${entityName}_${actions.addPermission}_ERROR`: {
      const { loading } = state;
      loading.addPermission = false;
      return {
        ...state,
        loading,
        error: action.payload,
      };
    }

    // Clear permissions
    // ----------------------------------------------------------//
    case `${entityName}_${actions.clearPermissions}_LOADING`: {
      const { loading } = state;
      loading.clearPermissions = true;
      return {
        ...state,
        loading,
      };
    }
    case `${entityName}_${actions.clearPermissions}_SUCCESS`: {
      const { loading } = state;
      loading.clearPermissions = false;
      return {
        ...state,
        loading,
        lastActionResponse: action.payload,
      };
    }
    case `${entityName}_${actions.clearPermissions}_ERROR`: {
      const { loading } = state;
      loading.clearPermissions = false;
      return {
        ...state,
        loading,
        error: action.payload,
      };
    }

    // Clear group
    // ----------------------------------------------------------//
    case `${entityName}_${actions.clearGroup}_LOADING`: {
      const { loading } = state;
      loading.clearPermissions = true;
      return {
        ...state,
        loading,
      };
    }
    case `${entityName}_${actions.clearGroup}_SUCCESS`: {
      const { loading } = state;
      loading.clearPermissions = false;
      return {
        ...state,
        loading,
        lastActionResponse: action.payload,
      };
    }
    case `${entityName}_${actions.clearGroup}_ERROR`: {
      const { loading } = state;
      loading.clearPermissions = false;
      return {
        ...state,
        loading,
        error: action.payload,
      };
    }


    default: return state;
  }
}
