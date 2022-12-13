require('dotenv').config({ path: '.env.production' });
const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app);

//Run test suite
describe('Auth tests', () => {

    it('Missing API key should output an error', async () => {

        const res = await request.get('/airquality');
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('API key missing');

    });

    it('Invalid API key should output an error', async () => {

        const res = await request.get('/airquality?key=invalidkey');
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Invalid API key');

    });

    it('Correct API key should send an OK success status', async () => {

        const res = await request.get(`/airquality?key=${process.env.API_KEY}&longitude=2.352222&latitude=48.856613`);
        expect(res.status).toBe(200);

    });

});
