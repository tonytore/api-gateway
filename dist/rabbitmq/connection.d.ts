export declare function connectRabbitMQ(): Promise<void>;
export declare function postPublish(exchangeName: string, queueName: string, message: object): Promise<boolean>;
