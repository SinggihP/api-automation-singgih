const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs')

const assert = require('chai').assert
const should = require('chai').should
const expect = require('chai').expect

describe('API test for "restful-api.dev"', () => {
    const BASE_URL = "https://api.restful-api.dev/"


    it('Test - GET ALL objects', async () => {
        const response = await request(BASE_URL)
        .get("objects")
     
        //assertion
        assert.equal(response.statusCode, 200)
        assert.equal(response.body[0].name, "Google Pixel 6 Pro")
        assert.equal(response.body[0].data.color, "Cloudy White")
        should(response.statusCode === 200)
        expect(response.statusCode).to.equal(200)
    });

    it('Test - POST Store objects', async () => {
        const body = {
            "name": "Ini Request dari Automation Test",
            "data": {
               "year": 2019,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }
         }
        const response = await request(BASE_URL)
        .post("objects")
        .send(body)

        console.log(response.statusCode);
        console.log(response.body)
 
        //assertion
        should(response.statusCode === 200)

        const schemaPath = "Resources/jsonSchema/post-object-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)


    });


});
