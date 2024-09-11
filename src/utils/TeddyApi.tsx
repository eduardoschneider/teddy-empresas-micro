import axios from 'axios';

const RequestInterceptor = async (config: any) => {

  config.headers.ContentType = 'application/json';
  return config;
};

const TeddyApi = axios.create({
  baseURL: 'https://655cf25525b76d9884fe3153.mockapi.io/v1/external-companies',
});

TeddyApi.interceptors.request.use(RequestInterceptor);

export default TeddyApi;
