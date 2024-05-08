import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Task (e2e)', () => {
  let app: INestApplication;
  let taskId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /task - deve criar uma task', async () => {
    const response = await request(app.getHttpServer()).post('/task').send({
      title: 'Nova Task',
      description: 'Descrição da nova task',
      columnId: 'id_da_coluna',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    taskId = response.body.id; // Salva o ID para uso nos próximos testes
  });

  it('GET /task/:id - deve retornar uma task pelo id', async () => {
    const response = await request(app.getHttpServer()).get(`/task/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', taskId);
  });

  it('PATCH /task - deve atualizar propriedades da task', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/task/${taskId}`)
      .send({ title: 'Task Atualizada' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Task Atualizada');
  });

  it('DELETE /task - deve deletar uma task', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/task/${taskId}`,
    );
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('Column (e2e)', () => {
  let app: INestApplication;
  let columnId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /column - deve criar uma column', async () => {
    const response = await request(app.getHttpServer())
      .post('/column')
      .send({ title: 'Nova Coluna', boardId: 'id_do_quadro' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    columnId = response.body.id; // Salva o ID para uso nos próximos testes
  });

  it('GET /column/:id - deve retornar uma column pelo id', async () => {
    const response = await request(app.getHttpServer()).get(
      `/column/${columnId}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', columnId);
  });

  it('PATCH /column - deve atualizar propriedades da column', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/column/${columnId}`)
      .send({ title: 'Coluna Atualizada' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Coluna Atualizada');
  });

  it('DELETE /column - deve deletar uma column', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/column/${columnId}`,
    );
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('Board (e2e)', () => {
  let app: INestApplication;
  let boardId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /board - deve criar um board', async () => {
    const response = await request(app.getHttpServer())
      .post('/board')
      .send({ title: 'Novo Quadro' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    boardId = response.body.id; // Salva o ID para uso nos próximos testes
  });

  it('GET /board/:id - deve retornar um board pelo id', async () => {
    const response = await request(app.getHttpServer()).get(
      `/board/${boardId}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', boardId);
  });

  it('PATCH /board - deve atualizar propriedades do board', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/board/${boardId}`)
      .send({ title: 'Quadro Atualizado' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Quadro Atualizado');
  });

  it('DELETE /board - deve deletar um board', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/board/${boardId}`,
    );
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
