export const natsWrapper = {
  client: {
    // Is going to create a mock function (fake) where we can assert results
    // A mock function saves the number of time that was called and other informations, so it is going to
    // be necessary reset the data in setup file
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback;
        }
      ),
  },
};
