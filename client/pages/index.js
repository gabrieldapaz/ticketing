import axios from 'axios';

// It's not possible to do any data loadind inside of componenets themselves
// When we render a component with NextJS, during these server side rendering phase,
// we don't get any opportunity to make request all of our components are executed
// or rendered just one single time.

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return <h1>Landing page</h1>;
};

// If we ever want to fetch some data with nextJS during the server
// side rendering we are going to define this get initil props function
// Here we can make async requests, generate data whatever we need to do
// to do to fetch data. This function will be executed on the server

LandingPage.getInitialProps = async ({ req }) => {
  // windows object only exists on the browser
  // This will help see whether we are on the browser or on the server
  if (typeof window === 'undefined') {
    const { data } = await axios.get(
      'http://nginx-ingress.nginx-ingress.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    //we are on the browser!
    // request can be made with a base url of ''
    const { data } = await axios.get('/api/users/currentuser');

    //currentUser = null or currentUser = {}
    // response.data has the currentUser property
    return data;
  }
  return {};
};

export default LandingPage;
