import buildClient from '../api/build-client';

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

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
