const request = require('supertest');
const server = require('../server');
const db = require('../../data/dbConfig');

let token;
const user = {username: 'Testingthedata', password: '******'}
beforeAll((done) => {
    request(server)
      .post('/auth/organizers/register')
      .send({...user, name: 'Shenanigans'})
      .then(result => {
       request(server)
            .post('/auth/organizers/login')
            .send(user)
            .end((err, response) => {
                token = response.body.token; // save the token!
                done();
              });
    })
      
  });
  

describe('/types endpoint', () => {
    beforeEach(async () => {
        // this function executes and clears out the table before each test
        await db('types').truncate();
      });
    describe('/get types', () => {
        it('should return status 200 ok', async () => {
   
            const res = await request(server).get('/types').set('Authorization', `${token}`);
            const organizers = await db('organizers');
            expect(organizers).toHaveLength(3);
            expect(res.status).toBe(200)
            
        })

        it('should return an array of types', async () => {
            const res = await request(server).post('/types').set('Authorization', `${token}`).send({type: 'Beach Party'});
            const types = await request(server).get('/types').set('Authorization', `${token}`);
           
            expect(types.body).toHaveLength(1)
        })
    })

    describe('/post types', () => {
        it('should post a type and get status 201', async () => {
            const res = await request(server).post('/types').set('Authorization', `${token}`).send({type: 'Beach Party'});

            expect(res.status).toBe(201);
        })

        it('should return a json object of the created type', async () => {
            const res = await request(server).post('/types').set('Authorization', `${token}`).send({type: 'Hike'});

            expect(res.type).toEqual('application/json');
        })
    })

    describe('/delete type', () => {
        it('should return status 200 ok', async ()=> {
            const res = await request(server).post('/types').set('Authorization', `${token}`).send({type: 'Hike'});
            const id = res.body.id;
            const result = await request(server).delete(`/types/${id}`).set('Authorization', `${token}`)
            expect(result.status).toBe(200);
        })

        it('should delete the type', async ()=> {
            const res = await request(server).post('/types').set('Authorization', `${token}`).send({type: 'Hike'});
            const id = res.body.id;
            let types = await db('types')
            expect(types).toHaveLength(1)
            const result = await request(server).delete(`/types/${id}`).set('Authorization', `${token}`)
            expect(result.status).toBe(200);
            types = await db('types')
            expect(types).toHaveLength(0)
        })
    })

    describe('/put type', () => {
        it('should return status 200 ok', async () => {
            const res = await request(server).post('/types').set('Authorization', `${token}`).send({type: 'Hike'});
            const id = res.body.id;
            const put = await request(server).put(`/types/${id}`).set('Authorization', `${token}`).send({type: 'Hi'});
            expect(put.status).toBe(200)

        })

        it('should return updated type', async () => {
            const res = await request(server).post('/types').set('Authorization', `${token}`).send({type: 'Hike'});
            const updateType = 'Ski Trip'
            const id = res.body.id;
            const put = await request(server).put(`/types/${id}`).set('Authorization', `${token}`).send({type: updateType});
            expect(put.status).toBe(200)
            expect(put.body.type).toEqual(updateType);
        })
    })
})