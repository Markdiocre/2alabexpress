const app = require('../app')
const request = require('supertest');

describe("GET /product/",()=>{
    it("Should reutrn all items",async ()=>{
        const response = await request(app)
        .get('/product/')
        
        expect(response.status).toBe(200)
        expect(response.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining(
                    {
                        id: expect.any(Number),
                        name: expect.any(String),
                        price: expect.any(Number),
                    }
                )
            ])
        )
    })
})

describe("GET SINGLE /product/4",()=>{
    it("Should return single item with id of 4",async ()=>{
        const response = await request(app)
        .get('/product/4')
        
        expect(response.status).toBe(200)
        expect(response.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining(
                    {
                        id: 4,
                        name: expect.any(String),
                        price: expect.any(Number),
                    }
                )
            ])
        )
    })

    it("Should not return anything",async ()=>{
        const response = await request(app)
        .get('/product/99999999')
        
        expect(response.status).toBe(404)
        expect(response.body.message).toEqual("Product does not exist")
    })

})