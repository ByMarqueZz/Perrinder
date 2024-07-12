import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync(path.resolve(__dirname, '/etc/letsencrypt/live/webview.granada.ai/privkey.pem')),
  //   cert: fs.readFileSync(path.resolve(__dirname, '/etc/letsencrypt/live/webview.granada.ai/fullchain.pem')),
  // };
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Perrinder')
    .setDescription('Perrinder API REST')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(8000);
}
bootstrap();
