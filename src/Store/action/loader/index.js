import { START_LOADER, STOP_LOADER } from "../../actionType";

export const setStartLoader = (_payload) => {
  return { type: START_LOADER, payload: _payload };
};

export const setStopLoader = (_payload) => {
  return { type: STOP_LOADER, payload: _payload };
};
