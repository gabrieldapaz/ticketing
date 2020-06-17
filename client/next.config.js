module.exports = {
  webpackDevMiddleware: (config) => {
    // Poll all the different files inside of a project directory
    // automatically at once every 300 ms
    // Fix the issue with file change when running inside a Docker container (isn't 100%)
    config.watchOptions.poll = 300;
    return config;
  },
};
