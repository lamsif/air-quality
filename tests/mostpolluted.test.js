require('dotenv').config({ path: '.env.production' });
const { setupDatabase, closeDatabase } = require('./database');
const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app);

//Handle databese
beforeAll(setupDatabase);
afterAll(closeDatabase);

//Run test suite
describe('Most polluted endpoint tests', () => {

    it('Missing city should output error', async () => {

        const res = await request.get(`/mostpolluted?key=${process.env.API_KEY}`);
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('City parameter missing');

    });

    it('Unsaved city should output error', async () => {

        const res = await request.get(`/mostpolluted?key=${process.env.API_KEY}&city=Skikda`);
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('City data not found');

    });

    it('Saved city should send an OK success status and date field', async () => {

        const res = await request.get(`/mostpolluted?key=${process.env.API_KEY}&city=Paris`);
        expect(res.status).toBe(200);
        expect(res.body.MostPollutedDate).toBeDefined();

    });

});
