const request = require('supertest');
const server = require('./server');
describe('server', () => {
    describe('experiences route', () => {
        it('should return status 200 ok', async () => {
            const response = await request(server).get('/exp')
        })
    })
})