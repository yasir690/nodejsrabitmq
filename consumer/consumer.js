const amqp = require('amqplib');

async function receiveMessages() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Declare the same queue 'hello' to consume messages from it
    const queue = 'hello';
    await channel.assertQueue(queue, { durable: false });

    // Set up a consumer to process the message
    console.log('Waiting for messages in %s. To exit press CTRL+C', queue);
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log('Received:', msg.content.toString());
        channel.ack(msg); // Acknowledge the message
      }
    });
  } catch (error) {
    console.error('Error in receiving message:', error);
  }
}

receiveMessages();
