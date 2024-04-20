import {LoggerModule} from '../logger/logger.module';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {Aws_IoT_Core_Publish_Service} from './services/aws_iot_core_publish_only.service';
import {SmartPlugGateway} from "./gateway/smart_plug.gateway";
import {JwtConfigModule} from "../jwt/jwt.module";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        LoggerModule,
        JwtConfigModule,
    ],
    controllers: [],
    providers: [
        SmartPlugGateway,
        Aws_IoT_Core_Publish_Service,
    ],
})
export class SmartPlugModule {
}
