import Axios from 'axios';
import {showToast} from 'utils/helper/helper';

import EndPoints from './EndPoints';

const axiosInstance = Axios.create({
  baseURL: EndPoints.APIURL,
});

axiosInstance.interceptors.request.use(
  config => {
    console.log('axios request =>', config);
    return config;
  },
  error => {
    console.log('axios request error =>', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    console.log('axios response =>', config);
    return config;
  },
  error => {
    console.log('axios response error =>', error.response || error);
    return Promise.reject(error);
  },
);

const getFormData = object => {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
};

const APICall = async (
  method = 'post',
  body,
  url = null,
  headers = null,
  formData = false,
) => {
  method = method.toLowerCase();
  const config = {
    method,
    timeout: 1000 * 60 * 2,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (url) {
    config.url = url;
  }
  if (body && method === 'get') {
    config.params = body;
  } else if (body && method === 'post' && formData) {
    config.data = getFormData(body);
  } else {
    config.data = body;
  }
  if (headers) {
    config.headers = headers;
  }

  return new Promise(resolve => {
    axiosInstance(config)
      .then(res => resolve({status: res.status, data: res.data}))
      .catch(error => {
        if (error.response) {
          if (error.response.status === 502 || error.response.status === 404) {
            showToast('Something went wrong, Please try again later.');
          }
          if (
            error.response.status === 401 &&
            error.response.data?.message === 'Invalid token.'
          ) {
            showToast('Please Login Again');
          }
          if (error.response.data?.message !== 'Invalid token.') {
            showToast(error.response.data.message);
          }
          resolve({status: error.response.status, data: error.response.data});
          return;
        }
        if (error.code === 'ECONNABORTED') {
          showToast('Request timeout. Please check your internet connection');
          resolve({status: 400});
          return;
        }
        showToast('Something went wrong, Please try again later.');
        resolve({status: 400});
      });
  });
};

export default APICall;
