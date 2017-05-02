const defaultState = {
  loading: false,
  list: [],
  error: null,
};

const entityName = 'OBJECTS';
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case `${entityName}_FETCH`: {
      return {
        ...state,
        loading: true,
      };
    }
    case `${entityName}_FETCH_REJECTED`: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case `${entityName}_FETCH_FULFILLED`: {
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    }
    default: return state;
  }
}
