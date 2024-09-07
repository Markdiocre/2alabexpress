const app = require('../app')
const request = require('supertest');

describe('POST /auth/login',()=>{
    it("Should logged in given correct creds",async ()=>{

        const response = await request(app)
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send({
            username: "mark",
            password: "admin"
        })

        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual("Logged in!");
    })

    it("Should not logged in given wrong creds",async ()=>{

        const response = await request(app)
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send({
            username: "marksvcbcvbcvbcvbcvbcvbcv",
            password: "adminsbccvbcvbcv"
        })

        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual("Username or password may be wrong");
    })

    it("Should not logged in given wrong password",async ()=>{

        const response = await request(app)
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send({
            username: "mark",
            password: "adminsbccvbcvbcv"
        })

        expect(response.status).toEqual(401);
        expect(response.body.message).toEqual("Username or password may be wrong");
    })

    it("Should not logged in given wrong username",async ()=>{

        const response = await request(app)
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send({
            username: "manny",
            password: "admin"
        })

        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual("Username or password may be wrong");
    })
})