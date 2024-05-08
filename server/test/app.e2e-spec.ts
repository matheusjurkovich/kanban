import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AppService } from 'src/app.service';
import { INestApplication } from '@nestjs/common';

describe('Tasks', () => {
  let app: INestApplication;
  const taskService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(taskService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET task`, () => {
    return request(app.getHttpServer()).get('/cats').expect(200).expect({
      data: taskService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
