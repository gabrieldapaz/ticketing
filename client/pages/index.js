// It's not possible to do any data loading inside of componenets themselves
// When we render a component with NextJS, during these server side rendering phase,
// we don't get any opportunity to make request all of our components are executed
// or rendered just one single time.

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1> You are signed in </h1>
  ) : (
    <h1> You are NOT signed in</h1>
  );
};

// If we ever want to fetch some data with nextJS during the server
// side rendering we are going to define this get initil props function
// Here we can make async requests, generate data whatever we need to do
// to do to fetch data. This function will be executed on the server

//This getInitialProps is not invoked because another one is
//declared in __app.js

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
