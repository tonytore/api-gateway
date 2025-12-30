"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRabbitMQ = connectRabbitMQ;
exports.postPublish = postPublish;
const amqplib_1 = __importDefault(require("amqplib"));
const app_config_1 = __importDefault(require("../config/app_config"));
let channel;
async function connectRabbitMQ() {
    const URL = app_config_1.default.RABBITMQ_URL;
    const connection = await amqplib_1.default.connect(URL);
    channel = await connection.createChannel();
    await channel.assertExchange('post.exchange', 'topic', { durable: true });
}
async function postPublish(exchangeName, queueName, message) {
    return channel.publish(exchangeName, queueName, Buffer.from(JSON.stringify(message)), { persistent: true });
}
