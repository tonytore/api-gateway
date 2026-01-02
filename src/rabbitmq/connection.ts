import amqp from 'amqplib';
import appConfig from '@/config/app_config';

let channel: amqp.Channel;

export async function connectRabbitMQ() {
  const URL = appConfig.RABBITMQ_URL;
  const connection = await amqp.connect(URL);
  channel = await connection.createChannel();
  await channel.assertExchange('post.exchange', 'topic', { durable: true });

  return channel;
}

export function publishPostCommand(
  routingKey: 'post.create' | 'post.update' | 'post.delete',
  message: object,
) {
  if (!channel) {
    throw new Error('RabbitMQ channel not initialized');
  }

  channel.publish(
    'post.exchange',
    routingKey,
    Buffer.from(JSON.stringify(message)),
    { persistent: true },
  );
}