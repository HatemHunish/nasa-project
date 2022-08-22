const request = require('supertest');
const app=require('../../app');
const { mongoConnect,mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {

    beforeAll(async()=>{
        await mongoConnect();
    })
    afterAll(async()=>{
        await mongoDisconnect();
    })

    describe('Test GET /launches', () => {
        test('It should respond with 200 success', async() => { 
            const response =await request(app).get('/v1/launches')
            .expect(200)
            .expect('Content-Type',/json/);
            expect(response.statusCode).toBe(200);
         })
        
    }); 
    describe('Test POST /launche', () => {
        const completeLaunchData={
            mission:'Kepler-10',
            rocket:'Falcon 1',
            launchDate:new Date('January 1, 2030'),
            target:'Kepler-62 f',
        }
        const launchDataWithoutData={
            mission:'Kepler-10',
            rocket:'Falcon 1',
            target:'Kepler-1652 b',
        }
        const launchDataWithInvalidDate={
            mission:'Kepler-10',
            rocket:'Falcon 1',
            target:'Kepler-1652 b',
            launchDate:'s 1, 2030',
        }
        test('It should respond with 201 created',async () => {
            const response=await request(app)
            .post('/v1/launches')
            .send(completeLaunchData)
            .expect(201)
            .expect('Content-Type',/json/);
        const requestDate=new Date (completeLaunchData.launchDate).valueOf();
        // console.log('response--->',response.body);

        const responseDate=new Date (response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);
        expect(response.body).toMatchObject({
            mission:'Kepler-10',
            rocket:'Falcon 1',
            target:'Kepler-62 f',
        })
        })
    
        test('It should catch missing required properties', async() => {
            const response=await request(app)
            .post('/v1/launches')
            .send(launchDataWithoutData)
            .expect(400)
            .expect('Content-Type',/json/);
    
            expect(response.body).toStrictEqual({
                error:'Mission, rocket, launchDate and target are required'
            });
        })
        test('It should catch invalid dates', async() => {
            const response=await request(app)
            .post('/v1/launches')
            .send(launchDataWithInvalidDate)
            .expect(400)
            .expect('Content-Type',/json/);
    
            expect(response.body).toStrictEqual({ 
                error:'Invalid launch date'
            });
        })
    });
    
})
