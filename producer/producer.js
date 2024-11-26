const amqp = require('amqplib');

async function sendMessage() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://localhost'); // Default RabbitMQ URL
    const channel = await connection.createChannel();

    // Declare a queue called 'hello'
    const queue = 'hello';
    await channel.assertQueue(queue, { durable: false });

    // Send a message to the 'hello' queue
    const msg = 'Hello RabbitMQ!';
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log(`Sent: ${msg}`);

    // Close the connection after a small delay to allow the message to be processed
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error in sending message:', error);
  }
}

sendMessage();
