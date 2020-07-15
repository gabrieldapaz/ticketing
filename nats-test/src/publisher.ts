import nats from 'node-nats-streaming';

// The client what's going to connect to our NATS Streaming Server
// and try to exchange information with it

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

// Cannot use async await syntax, so have to listen for the event 'connect'
stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  // On NATS we can only share strings or raw data
  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20,
  });

  stan.publish('ticket:created', data, () => {
    console.log('Event published');
  });
});
