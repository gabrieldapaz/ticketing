import 'bootstrap/dist/css/bootstrap.css';

// When you want to include a global CSS you have to import in this _app file
// This the single file that is everytime load up when a user come to our application

export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
