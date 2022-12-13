require('dotenv').config({ path: '.env.production' });
const { setupDatabase, closeDatabase } = require('./database');
const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app);

//Handle databese
beforeAll(setupDatabase);
afterAll(closeDatabase);

//Run test suite
describe('Air quality endpoint tests', () => {

    it('Missing longitude and latitude should output error', async () => {

        const res = await request.get(`/airquality?key=${process.env.API_KEY}`);
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Params missing');

    });

    it('Passed coordinates should send an OK success status and the pollution data object', async () => {

        const res = await request.get(`/airquality?key=${process.env.API_KEY}&longitude=2.352222&latitude=48.856613`);
        expect(res.status).toBe(200);
        expect(res.body.Result.Pollution).toBeDefined();

    });

});
