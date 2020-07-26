import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  const options = stan.subscriptionOptions().setManualAckMode(true); // NATS won't say that recived some event. It's our task to do this and avoid loss the event with erros
  const subscription = stan.subscribe(
    'ticket:created',
    'orders-service-queue-group',
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});


// Solve issue of missing messages
// Signal interrupt
process.on('SIGINT', () => stan.close());
// Signal terminate
process.on('SIGTERM', () => stan.close());

// This doesn't cover all type of signals like SIGKILL