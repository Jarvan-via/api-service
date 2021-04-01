
import '../lib/common.test';
import superTest from 'supertest';

import getApp from '../../app';
import router from '../../router';

let app;

beforeAll((done) => {
  app = getApp(router);
  done();
});

describe('health-check', () => {
  test('success', (done) => {
    superTest(app)
      .post('/ping')
      .end((err, result) => {
        expect(err).toBe(null);
        expect(result.body).toHaveProperty('code');
        expect(result.body).toHaveProperty('message');
        expect(result.body).toHaveProperty('data');
        expect(result.body.data).toHaveProperty('NODE_ENV');
        done();
      });
  });
});