import { Publisher, OrderCreatedEvent, Subjects } from '@dpztickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
