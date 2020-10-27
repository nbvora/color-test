import { CancelToken } from "axios";
import { actionChannel, take, fork, call, put } from "redux-saga/effects";
import getAxios from "./axiosAPI";
import { setStartLoader, setStopLoader } from "../action/loader";

const pendingRequests = {};

const similarPendingRequestExist = (actionType, url) =>
  pendingRequests[actionType] && pendingRequests[actionType].url === url;

function* invokeAPI(action) {
  const { payload } = action;
  const {
    method,
    url,
    data,
    apiConfig,
    action: actionType,
    resolve,
    reject,
  } = payload;
  try {
    yield put(setStartLoader());
    let response = {};
    const api = getAxios();
    switch (method) {
      case "GET": {
        if (similarPendingRequestExist(actionType, url)) {
          throw new Error("Similar axios request detected!");
        } else {
          const source = CancelToken.source();
          const cancelToken = source.token;
          pendingRequests[actionType] = { url, api, source };

          response = yield call([api, api.get], url, {
            ...apiConfig,
            cancelToken,
          });
        }
        break;
      }
      case "POST":
        response = yield call([api, api.post], url, data, { ...apiConfig });
        break;

      case "PUT":
        response = yield call([api, api.put], url, data, { ...apiConfig });
        break;

      case "PATCH":
        response = yield call([api, api.patch], url, data, { ...apiConfig });
        break;

      case "DELETE":
        response = yield call(
          [api, api.delete],
          url,
          { data },
          { ...apiConfig }
        );
        break;

      default:
        throw new Error(`API method ${method} is not supported!`);
    }
    // debugger;
    if (response.status === Number(200) || response.status === Number(201)) {
      yield* dispatchFulfilled(action, response.data);
      // yield put(showToastMessage({ message: _get(response, 'data.message', ''), type: _get(response, 'data.type', '') }));
    } else {
      yield* dispatchRejected(payload.action, action, "Internal server error");
      // yield put(showToastMessage({ message: 'Internal error, Try again', type: 'error' }));
    }
    delete pendingRequests[actionType];
    if (resolve) {
      resolve(response.data);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      //logout user and redirect to login screen
    }
    yield* dispatchRejected(payload.action, action, error);
    if (reject) {
      reject(error);
    }
    // yield put(showToastMessage({ message: 'Internal error, Try again', type: 'error' }));
  } finally {
    yield put(setStopLoader());
  }
}

function* dispatchFulfilled(action, response) {
  yield put({ type: `${action.payload.action}_SUCCESS`, payload: response });
}

function* dispatchRejected(actionType, action, error) {
  yield put({
    type: `${actionType}_ERROR`,
    actualAction: action,
    payload: { response: error },
  });
}

function* apiSaga() {
  const actionQueue = yield actionChannel("API_INVOCATION");
  while (true) {
    const action = yield take(actionQueue);
    yield fork(invokeAPI, action);
  }
}

export { invokeAPI };
export default apiSaga;
