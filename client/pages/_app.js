import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

// When you want to include a global CSS you have to import in this _app file
// This the single file that is everytime load up when a user come to our application

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  //Due the index getInitialProps are not more invkoed, we will call inside this function
  // Getting the context

  // create a if because the getInitialProps it's just defined on the index
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  console.log(pageProps);

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
