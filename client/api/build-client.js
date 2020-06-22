import axios from 'axios';

// If we ever want to fetch some data with nextJS during the server
// side rendering we are going to define this get initil props function
// Here we can make async requests, generate data whatever we need to do
// to do to fetch data. This function will be executed on the server

export default ({ req }) => {
  // windows object only exists on the browser
  // This will help see whether we are on the browser or on the server
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      baseURL: 'http://my-release-ingress-nginx-controller.default.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: '/',
    });
  }
};
