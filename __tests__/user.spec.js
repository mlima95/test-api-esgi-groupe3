const {sequelize} = require("../models");
const supertest = require("supertest");
const client = supertest(require("../app.js"));


let txn;
const testBurger = {id: 999, name: "MagBurger", price: 10.0};

afterAll(async () => {
  await sequelize.close();
});

beforeEach(async () => {
  txn = await sequelize.transaction()
  sequelize.constructor['_cls'] = new Map()
  sequelize.constructor['_cls'].set('transaction', txn)
})

afterEach(async () => {
  await txn.rollback()
})

describe('Burgers', () => {
  it("Should be 0 burger", async () => {
    const response = await client.get("/burgers");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });
  it("should create a burger", async () => {
    const response = await client.post("/burgers").send(testBurger);
    expect(response.statusCode).toBe(201);
  });
  it("should update a burger", async () => {
    await createUser();
    const response = await client.put(`/burgers/${testBurger.id}`).send(testBurger);
    expect(response.statusCode).toBe(200);
  });

  it('should update partially a burger', async () => {
    await createUser();
    const response = await client.patch(`/burgers/${testBurger.id}`).send({name: "MagBurger"});
    expect(response.statusCode).toBe(200);
  });

  it("should delete a burger", async () => {
    await createUser();
    const response = await client.delete(`/burgers/${testBurger.id}`);
    expect(response.statusCode).toBe(200);
  });

  it("should return a 404 when burger is not found", async () => {
    await createUser();
    const response = await client.get(`/burgers/${testBurger.id+12}`);
    expect(response.statusCode).toBe(404);
  });

  it("should return an error when only burger name is sent", async () => {
    await createUser();
    const response = await client.put(`/burgers/${testBurger.id}`).send({name: "MagBurger"});
    expect(response.statusCode).toBe(400);
  });

  it("should return an error when only burger price is sent", async () => {
    await createUser();
    const response = await client.post(`/burgers/${testBurger.id}`).send({price: testBurger.price+1.0});
    expect(response.statusCode).toBe(400);
  });

});

createUser = async () => {
  await client.post("/burgers").send(testBurger);
}

