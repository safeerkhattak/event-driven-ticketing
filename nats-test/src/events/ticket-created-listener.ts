import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-events";
import { Subjects } from "./subject";

// we want the typescript to somehow validate this pairing of the subject that we are listing and type of this data argument on message

export class TicketCreatedListener extends Listener <TicketCreatedEvent>{
   subject: Subjects.TicketCreated = Subjects.TicketCreated;
   queueGroupName = 'payment-service';
   onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
      console.log("Event data!",data,"seq",msg.getSequence())
      msg.ack()
   }

}