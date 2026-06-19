import nats, { Message, Stan } from "node-nats-streaming";

console.clear();
const id = Math.floor(Math.random() * 10000);
const stan = nats.connect("ticketing", String(id), {
  url: "http://localhost:4222",
}) as any;

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS CONNECTION CLOSED");
    process.exit();
  });
  const options = 
      stan.subscriptionOptions()
      .setManualAckMode(true)
      .setDeliverAllAvailable() // to get all events deliver again
      .setDurableName('accounting service');   /// to create durable subscription(keep track of either listener handles the event or not)

  const subscription = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group", //
    options,
  );
  subscription.on("message", (msg: Message) => {
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(`Recieved Event #${msg.getSequence()}, with data: ${data} `);
    }
    msg.ack();
  });
});

process.on("SIGINT", () => stan.close()); //interupt it will close our client on interrupt same for below
process.on("SIGTERM", () => stan.close()); // terminate 
// if you close the node isntance forcefully from task manager the above close event wont occure also it does not 100% work on windows

//ACk mode
// queue groupds
//Gracefull shutdown anytime a client is about to close down
//Publishers & channels 
//event redelivery when the service is down 

//       .setDeliverAllAvailable() // to get all events deliver again // .setDurableName('accounting service'); and queue group these all three are really imp and work togehter


//3 more solution that will not work to solve the concurrency issue