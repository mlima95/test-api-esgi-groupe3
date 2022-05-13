const {Given, When, Then, AfterAll} = require("@cucumber/cucumber");
const supertest = require("supertest");
const app = require("../app");
const ReferenceManager = require("../fixtures/ReferenceManager");
const {sequelize} = require("../models");
const expect = require("expect");
const client = supertest(app);

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

AfterAll(async () => {
    await sequelize.close();
});

Given('I request {string} {string}', async function (method, path) {
    this.request = client[method.toLowerCase()](interpolateString(path));
    this.response = await this.request.send();
});

Given("I am authenticated as {string}", function (string) {
    const user = ReferenceManager.getReference(string);
    // user => token
    this.token = "???";
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

Then('the response should be :', function (dataTable) {
    expect(this.response.status).toBe(dataTable);
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

