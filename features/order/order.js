const {Given, When, Then, AfterAll} = require("@cucumber/cucumber");
const supertest = require("supertest");
const app = require("../../app");
const ReferenceManager = require("../../fixtures/ReferenceManager");
const {sequelize} = require("../../models");
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

When('I send a request with the following body:', function (dataTable) {
    return 'pending';
});

Then('I should get a response with status code {string}', function (string) {
    expect(this.response.status).toBe(string);
});

Then('the order should be deleted', function () {
    return 'pending';
});

When('I send the request with the following body:', function (dataTable) {
    return 'pending';
});

Then('the response should be:', function (dataTable) {
    expect(this.response.status).toBe(dataTable);
});

Then('I should receive an empty array', function () {
    expect(this.response.body.length).toBe(0);
});

Then('the response status should be {int}', function (int) {
    expect(this.response.status).toBe(int);
});

Then('I should receive a an array with {int} elements', function (int) {
    expect(this.response.body.length).toBe(int);
});

Then('I should receive an array with all the orders', function () {
    return 'pending';
});

Then('I should receive a order with the same attributes as the payload', function (dataTable) {
    return 'pending';
});
