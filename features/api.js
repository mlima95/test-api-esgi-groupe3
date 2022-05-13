const {Given, When, Then, AfterAll, BeforeAll, Before, After} = require("@cucumber/cucumber");
const supertest = require("supertest");
const app = require("../app");
const ReferenceManager = require("../fixtures/ReferenceManager");
const {sequelize} = require("../models");
const { expect } = require("expect");

const FixtureLoader = require('../fixtures/FixtureLoader.js');
const fs = require('fs/promises');
const client = supertest(app);
let txn;

function interpolateString(str) {
    return str.replace(/\{\{\s*([^}]+)\s*\}\}/g, (match, name) => {
        return ReferenceManager.getValue(name);
    });
}
function interpolate(obj) {
    for (let key in obj) {
        if (typeof obj[key] === "string") {
            obj[key] = interpolateString(obj[key]);
        }
        if (typeof obj[key] === "object") {
            obj[key] = interpolate(obj[key]);
        }
    }
    return obj;
}

Before(async () => {
    txn = await sequelize.transaction();
    sequelize.constructor['_cls'] = new Map();
    sequelize.constructor['_cls'].set('transaction', txn);
})
After(async () => {
    await txn.rollback();
})
AfterAll(async () => {
    await sequelize.close();
});

When('I request {string} {string}', async function (method, path) {
    this.request = client[method.toLowerCase()](interpolateString(path));
    if(this.token) {
        this.request.set('authorization', `Bearer ${this.token}`);
    }
    this.response = await this.request.send();
});

Given("I am authenticated as {string}", async function (string) {

    await FixtureLoader(
        await fs.realpath(__dirname + "/../fixtures/user.json")
    );
    const user = ReferenceManager.getReference(string + ".fixture");

    console.log("aaaaaaaaaaaaaaaa", {user})
    const res = await client.post("/login")
        .set("Content-Type", "application/json").send({
            username: user.username,
            password: user.password
        });
    this.token = res.body.token;
    console.log("aaaaaaaaaaaaaaaa", res.body, this.token)
});

When('I send a request with the following body:', function (dataTable) {
    this.payload = dataTable.rowsHash();
});


Then('I should get a response with status code {string}', function (string) {
    expect(this.response.status).toBe(string);
});

Then('the {string} should be deleted', function (entity) {
    expect(ReferenceManager.getValue(entity)).toBe(null);
});

Then('the response should be {int}', function (int) {
    expect(this.response.status).toBe(int);
});

Then('I should receive an empty array', function () {
    expect(this.response.body.length).toBe(0);
});

Then('I should receive a an array with {int} elements', function (int) {
    expect(this.response.body.length).toBe(int);
});

Then('I should receive an array with all the {string}', function (entity) {
    expect(this.response.body.length).toBe(ReferenceManager.getValue(entity).length);
});

Then('I should receive a order with the same attributes as the payload', function (dataTable) {
    expect(this.response.body).toEqual(interpolate(dataTable.rowsHash()));
});
