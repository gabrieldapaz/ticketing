import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

// Listener will be a Generic class
// When we want to use Listener in any way we should provide an custom type
export abstract class Listener<T extends Event> {
  abstract subject: T['subject']; // When you use abstract properties you need to define on child classes
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: Message): void;
  protected client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable() // Is good for when the service is created for the FIRST time
      .setManualAckMode(true) // NATS won't say that recived some event. It's our task to do this and avoid loss the event with erros
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName, // persist the durable name and ensure that the event only goes to one instance of the listeners
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(`Message received ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }
  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data) // String
      : JSON.parse(data.toString('utf-8')); // Buffer
  }
}
