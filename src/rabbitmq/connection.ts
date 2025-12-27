import amqp from 'amqplib';
import appConfig from '../config/app_config';

let channel: amqp.Channel;

export async function connectRabbitMQ() {
  const URL = appConfig.RABBITMQ_URL;
  const connection = await amqp.connect(URL);
  channel = await connection.createChannel();
  await channel.assertExchange('post.exchange', 'topic', { durable: true });
}

export async function postPublish(
  exchangeName: string,
  queueName: string,
  message: object,
) {
  return channel.publish(
    exchangeName,
    queueName,
    Buffer.from(JSON.stringify(message)),
    { persistent: true },
  );
}
