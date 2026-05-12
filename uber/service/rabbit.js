// import amqp from "amqplib";

// const RABBITMQ_URL = process.env.RABBIT_URL;

// let connection;
// let channel;

// // ─── CONNECT ─────────────────────────────
// export const connect = async () => {
//   connection = await amqp.connect(RABBITMQ_URL);
//   channel = await connection.createChannel();
//   console.log("Connected to RabbitMQ");
// };

// // ─── SUBSCRIBE ───────────────────────────
// export const subscribeToQueue = async (queueName, callback) => {
//   if (!channel) await connect();

//   await channel.assertQueue(queueName);

//   channel.consume(queueName, (message) => {
//     if (message !== null) {
//       callback(message.content.toString());
//       channel.ack(message);
//     }
//   });
// };

// // ─── PUBLISH ─────────────────────────────
// export const publishToQueue = async (queueName, data) => {
//   if (!channel) await connect();

//   await channel.assertQueue(queueName);

//   channel.sendToQueue(queueName, Buffer.from(data));
// };











import amqp from "amqplib";

let connection;
let channel;

// ─── CONNECT ─────────────────────────────
export const connect = async () => {
  try {
    const RABBITMQ_URL = process.env.RABBIT_URL;

    console.log("RabbitMQ URL:", RABBITMQ_URL);

    connection = await amqp.connect(RABBITMQ_URL);

    channel = await connection.createChannel();

    console.log("Connected to RabbitMQ");

  } catch (error) {
    console.error("RabbitMQ connection error:", error);
    throw error;
  }
};

// ─── PUBLISH ─────────────────────────────
export const publishToQueue = async (queueName, data) => {
  if (!channel) await connect();

  await channel.assertQueue(queueName);

  channel.sendToQueue(
    queueName,
    Buffer.from(JSON.stringify(data))
  );
};

// ─── SUBSCRIBE ───────────────────────────
export const subscribeToQueue = async (queueName, callback) => {
  if (!channel) await connect();

  await channel.assertQueue(queueName);

  channel.consume(queueName, (message) => {
    if (message) {
      const data = JSON.parse(message.content.toString());

      callback(data);

      channel.ack(message);
    }
  });
};