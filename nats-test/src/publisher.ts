import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

// The client what's going to connect to our NATS Streaming Server
// and try to exchange information with it

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

// Cannot use async await syntax, so have to listen for the event 'connect'
stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }
});
