import axios from 'axios';
import constants from '../../constants';

const entityName = 'OBJECTS';

export function fetchObjects() {
  return (dispach) => {
    dispach({ type: `${entityName}_FETCH` });

    axios.get(`${constants.BASE_URL}/objects`)
      .then((response) => {
        dispach({
          type: `${entityName}_FETCH_FULFILLED`,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispach({
          type: `${entityName}_FETCH_ERROR`,
          payload: error,
        });
      });
  };
}
