import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CRUD Application (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Testes para a rota Task
  it('GET /task - deve retornar todas as tasks', async () => {
    const response = await request(app.getHttpServer()).get('/task');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Testes para a rota Column
  it('GET /column - deve retornar todas as columns', async () => {
    const response = await request(app.getHttpServer()).get('/column');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Testes para a rota Board
  it('GET /board - deve retornar todos os boards', async () => {
    const response = await request(app.getHttpServer()).get('/board');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  afterEach(async () => {
    await app.close();
  });
});
