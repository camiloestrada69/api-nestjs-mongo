import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./exception/filters/htt.exception.filter";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

  const options = new DocumentBuilder()
      .setTitle('Calidad Match Datos API')
      .setVersion('4.0')
      .addSecurity('basic', {
        type: 'http',
        scheme: 'basic',
      })
      .addTag('Usuarios')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document, {
      explorer: true,
      swaggerOptions: {
          filter: true,
          showRequestDuration: true,
      }
  });

  app.useGlobalFilters(
      new HttpExceptionFilter(),
  );

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      subscribe: {
        fromBeginning: true
      },
      consumer: {
        groupId: 'my-topic-eit',
      },
      client: {
        brokers: ['localhost:9092']
      }
    }
  } as MicroserviceOptions);
  app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000)
}
bootstrap();
