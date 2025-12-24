export declare function connectRabbitMQ(): Promise<void>;
export declare function publish(exchangeName: string, queueName: string, message: object): Promise<boolean>;
