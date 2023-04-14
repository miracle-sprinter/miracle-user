import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT;

  const app = await NestFactory.create(AppModule);

  // Global Pipe는 맨 앞에 선언해야한다
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 500,
      exceptionFactory: (errors) => {
        return new Error(
          errors
            .map((error) => {
              return `${error.property}를 잘못 입력하셨습니다.`;
            })
            .join(', '),
        );
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(PORT);
}
bootstrap();
