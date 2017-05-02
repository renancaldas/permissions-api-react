import axios from 'axios';
import constants from '../../constants';

const entityName = 'PERMISSIONS';

export function fetchPermissions() {
  return (dispach) => {
    dispach({ type: `${entityName}_FETCH` });

    axios.get(`${constants.BASE_URL}/permissions`)
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
