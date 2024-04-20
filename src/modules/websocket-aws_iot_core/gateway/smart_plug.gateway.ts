import {Inject, OnModuleInit, Req, UseGuards} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';

import {Namespace, Socket} from 'socket.io';
import * as AWSIoTDeviceSDK from 'aws-iot-device-sdk';
import {v4 as uuidv4} from 'uuid';
import {LoggerService} from '../../logger/services/logger.service'
import {JwtSocketStrategy} from "../../jwt/strategys/jwt-socket.strategy";
import {Aws_IoT_Core_Publish_Service} from "../services/aws_iot_core_publish_only.service";


@WebSocketGateway({namespace: 'smart_plug'})
export class SmartPlugGateway implements OnModuleInit, OnGatewayConnection {
    private device: AWSIoTDeviceSDK.Device;

    constructor(
        private logger: LoggerService,
        @Inject(ConfigService) private readonly config: ConfigService,
        private aws_IoT_Core_Publish_Service: Aws_IoT_Core_Publish_Service,
        private readonly jwtSocketStrategy: JwtSocketStrategy
    ) {
        this.device = AWSIoTDeviceSDK.device({
            clientId: `nest-js-client_sp_${uuidv4()}`,
            protocol: 'wss',
            port: 443,
            host: process.env.AWS_ENDPOINT,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            autoResubscribe: true,
            protocolVersion: 5,
        });
    }

    @WebSocketServer()
    server: Namespace;

    async onModuleInit() {
        try {
            this.initializeMqtt();
        } catch (mqttError) {
            this.logger.error(`${mqttError} `, `${this.constructor.name}.onModuleInit():`);
        }
    }

    async handleConnection(socket: Socket): Promise<void> {
        try {
            const canActivate = await this.jwtSocketStrategy.canActivate({
                switchToWs: () => ({getClient: () => socket}),
            } as any);

            if (!canActivate) {
                socket.disconnect(true);
            } else if (canActivate) {
                // Handle the WebSocket connection for the authenticated user
                const roomName = socket.handshake.headers.room;
                socket.join(roomName);

                this.server
                    .to(socket.id)
                    .emit('app/subscribe', {msg: `connected id = ${socket.id}`});
                console.log('=================================');
                console.log(`socket connected Id = ${socket.id}`);
                console.log('=================================');
                // console.log(socket.handshake.headers.authorization);
                // console.log('=================================');
                // console.log(socket.client);
                // console.log('=================================');
            }
        } catch (error) {
            console.error('Error handling connection:', error.message);
            socket.disconnect(true);
        }
    }

    private initializeMqtt() {
        this.device = AWSIoTDeviceSDK.device({
            clientId: `nest-js-client_xyz_${uuidv4()}`,
            protocol: "wss",
            port: 443,
            host: process.env.AWS_ENDPOINT,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            autoResubscribe: true,
            protocolVersion: 5
        });

        this.device
            .on("connect", () => {
                this.logger.info("****************************", `${this.constructor.name}.initializeMqtt():`);
                this.logger.info("Connected to AWS IoT Core", `${this.constructor.name}.initializeMqtt():`);
                this.logger.info("****************************", `${this.constructor.name}.initializeMqtt():`);

                this.device.subscribe("#");
                // this.device.subscribe("xyz/publish/#");
                // this.device.subscribe("$aws/events/presence/disconnected/#");
                // this.device.subscribe("$aws/events/presence/connected/#");
            })
            .on("message", async (topic: string, payload: Buffer) => {
                //here we are listening AWS IoT Core subscribe data
                this.logger.info(`Received message ${topic} ${payload.toString()}`, `${this.constructor.name}.onModuleInit():`);

                if (topic.startsWith("sp/publish/")) {
                    const modifiedTopic = topic.replace("sp/publish/", "");
                    this.logger.info(`Received message ${modifiedTopic} ${payload.toString()}`, `${this.constructor.name}.onModuleInit():`);
                    await this.sendMessageToRoom(modifiedTopic.toString(), 'mqtt_listen', payload);
                }
            })
            .on("close", () => {
                this.logger.info("****************************", `${this.constructor.name}.initializeMqtt():`);
                this.logger.info(
                    "Connection to AWS IoT Core closed. Attempting to reconnect...",
                    `${this.constructor.name}.initializeMqtt():`
                );
                this.logger.info("****************************", `${this.constructor.name}.initializeMqtt():`);
            });
    }

    //================================================================
    //---------------------------socket-------------------------------
    //================================================================

    @SubscribeMessage('app/publish')
    @UseGuards(JwtSocketStrategy)
    async NewMessage(
        @Req() req: any,
        @MessageBody() messageData: any,
        @ConnectedSocket() socket: Socket,
    ) {
        const room = socket.handshake.headers.room;
        try {
            await this.aws_IoT_Core_Publish_Service.publishToAws(room.toString(), messageData);
            this.server.to(room).emit('app/subscribe', 'Successful');
        } catch (e) {
            this.server.to(room).emit('app/subscribe', 'Unsuccessful');
        }

    }

    async emitToRoom(room: string, listener: string, data: any) {
        this.server.to(room).emit(`app/subscribe/${listener}`, data);
    }

    //================================================================
    //-----------------------------MQTT-------------------------------
    //================================================================
    //our server --> AWS IoT core
    // async publishToAws(topic: string, body: any): Promise<boolean> {
    //     topic = `sp/subscribe/${topic}`;
    //     try {
    //         this.device.publish(`${topic}`, JSON.stringify(body));
    //         this.logger.info(`Published to topic ${topic}`, `${this.constructor.name}.publishToAws():`);
    //         return true;
    //     } catch (error) {
    //         this.logger.error(
    //             `Error publishing to topic ${topic} ${error}`,
    //             `${this.constructor.name}.publishToAws():`,
    //         );
    //         return false;
    //     }
    // }

    //sent data to the app (specific room of websocket)
    async sendMessageToRoom(room: string, listener: string, data: any) {
        await this.emitToRoom(room, listener, data.toString());
    }
}
