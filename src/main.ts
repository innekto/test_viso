import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useWebSocketAdapter(new IoAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('Google Sheets API')
    .setDescription('API для роботи з Google Sheets')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => console.log(`server started on port:${PORT}`));
}
bootstrap();
