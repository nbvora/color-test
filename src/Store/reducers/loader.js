import { START_LOADER, STOP_LOADER } from "../actionType";
const INITIAL_STATE = {
  loaderStatus: false,
  toast: {
    message: "",
    type: "",
  },
};
const loader = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_LOADER:
      return {
        ...state,
        loaderStatus: true,
      };
    case STOP_LOADER:
      return {
        ...state,
        loaderStatus: false,
      };
    default:
      return state;
  }
};
export default loader;
