
import {MaestrosModule} from "./modules/maestros/maestros.module";

import {HttpExceptionFilter} from "./exception/filters/htt.exception.filter";
import {AutomapperModule} from "@automapper/nestjs";
import {classes} from "@automapper/classes";
import {ConfigModule} from "@nestjs/config";
import configuration from "../config/configuration";
import {MongooseModule} from "@nestjs/mongoose";
import {APP_FILTER} from "@nestjs/core";
import {Logger, Module} from "@nestjs/common";
import {validationSchema} from "../config/validation";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    MaestrosModule,
    AutomapperModule.forRoot({strategyInitializer: classes()}),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.env`,
      load: [configuration],
      validationSchema,
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DATABASE),
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    Logger
  ],
})
export class AppModule {}
