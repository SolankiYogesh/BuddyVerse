import axios from 'axios';
import {config} from './config/index';

import NetInfo from '@react-native-community/netinfo';
import {debugLogs} from 'utils/logs/logs';

export const instance = axios.create({
  baseURL: config.baseURL,
  timeout: config.timeOut,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
});

// API Request
instance.interceptors.request.use(
  config => {
    console.log('\n\n ============================================');
    console.log('\n HTTP Method: POST');
    console.log(`\n Request for Base URL: ${config.baseURL}`);
    console.log(`\n Request for URL Endpoint: ${config.url}`);
    console.log(`\n Parameters: `, config.data ? config.data : config.params);
    console.log('============================================ \n\n');
    debugLogs(`\n Config for : ${config.url}`, config);
    return config;
  },
  error => {
    debugLogs(`Config Error ::: ${error.url}`, error);
    return Promise.reject(error);
  },
);

// API Response
instance.interceptors.response.use(
  response => {
    debugLogs(`Response For ::: ${response.config.url}`, response);
    return response;
  },
  error => {
    debugLogs(`Error For ::: `, error);
    return Promise.reject(error);
  },
);

// Image URL
export const getImageURL = (imageURL: string) => {
  const urlForImage = config.baseURL + '/files/' + imageURL;
  return urlForImage;
};

// Cancel tokens
const cancelTokens = {};

// export const generateJWTToken = (
//   tenetID: string,
//   updateConfig?: jwtCredentials,
// ) => {
//   let JWTTokenParams = {
//     client_id: tenetID,
//     client_secret: config.clientSecret,
//     scope: config.scope,
//     grant_type: config.grantType,
//   };
//   JWTTokenParams = {...JWTTokenParams, ...updateConfig};
//   currentTenetID = tenetID;
//   const bodyFormData = new FormData();
//   Object.keys(JWTTokenParams).map(key => {
//     bodyFormData.append(key, JWTTokenParams[key]);
//   });

//   return axios
//     .post(config.JWTURL, bodyFormData, {
//       headers: {'Content-Type': 'multipart/form-data'},
//     })
//     .then(responseJWT => {
//       debugLogs('JWT Token', responseJWT);
//       instance.defaults.headers = {
//         Authorization: `Bearer ${responseJWT.data.access_token}`,
//       };
//     })
//     .catch(errorJWT => {
//       debugLogs('JWT Token Error', errorJWT);
//     });
// };

const getCancelToken = (tokenKey: string) => {
  const reqCancelToken = axios.CancelToken.source();
  cancelTokens[tokenKey] = reqCancelToken;
  return reqCancelToken;
};

// Simple GET request
export const getRequest = (endPoint: string) => {
  cancelRequest(endPoint);
  return instance.get(endPoint, {
    cancelToken: getCancelToken(endPoint).token,
  });
};

// GET request with params
export const getRequestWithParams = (endPoint: string, apiParams = {}) => {
  cancelRequest(endPoint);
  return instance.get(endPoint, {
    params: apiParams,
    cancelToken: getCancelToken(endPoint).token,
  });
};

// GET Request for image
export const getRequestForImage = (endPoint: string) => {
  cancelRequest(endPoint);
  const fileURL = '/files/' + endPoint;
  return instance.get(fileURL, {
    cancelToken: getCancelToken(endPoint).token,
    responseType: 'blob',
  });
};

// POST request
export const postRequest = (endPoint: string, apiParams = {}) => {
  cancelRequest(endPoint);
  return instance.post(endPoint, apiParams, {
    cancelToken: getCancelToken(endPoint).token,
  });
};

// Cancel requests
export const cancelRequest = (url: string) => {
  const cancelToken = cancelTokens[url];
  if (cancelToken) {
    debugLogs('before cancel req', cancelTokens);
    cancelToken.cancel('Operation canceled due to new request.');
    debugLogs('after cancel req', cancelTokens);
    delete cancelTokens[url];
  }
};

// Error handling from api
export const apiErrorHandling = (error, apiCall = () => {}) => {
  if (error.response && error.response.status === 401) {
    // generateJWTToken(currentTenetID).finally(() => {
    apiCall();
    // });
  } else if (error.response && error.response.data) {
    const {data} = error.response.data;
    alerts.errorAlert(data);
  } else if (error.response) {
    // alerts.simpleAlert('error with response');
  } else {
    debugLogs('Unknown Error', error);
  }
};

export const isInternetConnected = () => {
  return NetInfo.fetch().then(state => {
    return state.isConnected;
  });
};
