const {sequelize} = require("../models");
const supertest = require("supertest");
const client = supertest(require("../app.js"));


let txn;
const testBurger = {id: 999, name: "MagBurger", price: 10.0};
const simpleUser = {id: 999, username: "Bob", password: "1secure2345", roles: ["USER"]};
const adminUser = {id: 999, username: "Patrick", password: "1secure2345", roles: ["ADMIN"]};

const createBurger = async () => {
  await client.post("/burgers").send(testBurger);
}

const createUser = async (user) => {
  await client.post("/users").send(user);
}

const logUser = async (user) => {
  return await client.post("/login").send(user)
}

const createUserAndLog = async (user) => {
  await createUser(user);
  return await logUser(user);
}

beforeEach(async () => {
  txn = await sequelize.transaction();
  sequelize.constructor['_cls'] = new Map();
  sequelize.constructor['_cls'].set('transaction', txn);
});


afterEach(async () => {
  await txn.rollback()
});

afterAll(async () => {
  await sequelize.close();
});

describe('Burgers', () => {
  it("Should be 0 burger", async () => {
    const response = await client.get("/burgers").set("Authorization", "Bearer " + (createUserAndLog(simpleUser)).body.token);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });
  it("Should be 0 burger", async () => {
    createUserAndLog(simpleUser);
    const response = await client.get("/burgers");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });
  it("should create a burger", async () => {
    const response = await client.post("/burgers").send(testBurger);
    expect(response.statusCode).toBe(201);
  });
  it("should update a burger", async () => {
    const response = await client.put(`/burgers/${testBurger.id}`).send(testBurger);
    expect(response.statusCode).toBe(200);
  });

  it('should update partially a burger', async () => {
    const response = await client.patch(`/burgers/${testBurger.id}`).send({name: "MagBurger"});
    expect(response.statusCode).toBe(200);
  });

  it("should delete a burger", async () => {
    const response = await client.delete(`/burgers/${testBurger.id}`);
    expect(response.statusCode).toBe(200);
  });

  it("should return a 404 when burger is not found", async () => {
    const response = await client.get(`/burgers/${testBurger.id+12}`);
    expect(response.statusCode).toBe(404);
  });

  it("should return an error when only burger name is sent", async () => {
    const response = await client.put(`/burgers/${testBurger.id}`).send({name: "MagBurger"});
    expect(response.statusCode).toBe(400);
  });

  it("should return an error when only burger price is sent", async () => {
    const response = await client.post(`/burgers/${testBurger.id}`).send({price: testBurger.price+1.0});
    expect(response.statusCode).toBe(400);
  });

});




