import {Injectable, OnModuleInit} from "@nestjs/common";
import {LoggerService} from "../../logger/services/logger.service";
import * as AWS from "aws-sdk";

@Injectable()
export class Aws_IoT_Core_Publish_Service implements OnModuleInit {
    constructor(private readonly logger: LoggerService) {
    }

    onModuleInit() {
        this.logger.info("onModuleInit called...", `${this.constructor.name}.onModuleInit():`);
    }

    public async publishToAws(topic: string, data: any) {
        topic = `sp/subscribe/${topic}`;
        try {
            AWS.config.update({
                region: process.env.AWS_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                },
            });
            const iotdata = new AWS.IotData({
                endpoint: process.env.AWS_ENDPOINT,
            });

            const mqttParams = {
                qos: 1,
                topic: `${topic}`,
                payload: JSON.stringify(data),
            };

            await iotdata.publish(mqttParams).promise();
            this.logger.info(`Published to topic ${topic}`);
            return true;
        } catch (error) {
            this.logger.error(
                `Error publishing to topic ${topic} error=${error}`,
                `${this.constructor.name}.publishToAws():`,
            );
            return false;
        }
    }
}
