import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import * as mongoose from 'mongoose'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  // mongoose.connect('mongodb://localhost/blog-api-nest',{
  //   useNewUrlParser:true,
  //   useFindAndModify:false,
  //   useCreateIndex:true
  // })
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  const options = new DocumentBuilder()
    .setTitle('Nestjs Blog API')
    .setDescription('博客APi by nestjs ')
    .setVersion('1.0')
    // .addTag('blog')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3823);

  console.log('接口请访问:localhost:3823');
}
bootstrap();
