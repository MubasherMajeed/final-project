import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);



  const configurations = new DocumentBuilder().setTitle("Electro Mate").
  setDescription("Electomate Apis`s").addTag("All Electomate Apis")
    .addBearerAuth(
      {
        type:'http',
        scheme: 'bearer',
        bearerFormat:'jwt'
      },"access-token"
    ).build();
  const apiDocument = SwaggerModule.createDocument(app,configurations);

  SwaggerModule.setup('api',app,apiDocument);

  await app.listen(3000);
}

bootstrap();
