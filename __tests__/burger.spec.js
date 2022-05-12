const {sequelize} = require("../models");
const supertest = require("supertest");
const models = require("../models");
const client = supertest(require("../app"));
jest.spyOn(sequelize, 'transaction');

beforeEach(() => {
  jest.clearAllMocks();
});

describe("test Burger API", () => {
  // it("should return all burgers", async () => {
  // const response = await client.get("/burgers");
  // console.trace(response);
  // jest.spyOn(models.Burger, 'create');
  // expect(response.statusCode).toBe(200);
  // })

  it("should return a burger", async () => {
    const response = await client.get("/burgers/1");
    expect(response.statusCode).toBe(200);
  })

  it("should create a burger", async () => {
    const response = await client.post("/burgers").send({name: "MagBurger", price: 10.0});
    expect(response.statusCode).toBe(201);
  });

  it("should update a burger", async () => {
    const response = await client.put("/burgers/1").send({name: "MagueBurger", price: 11.0});
    expect(response.statusCode).toBe(200);
  });

  it('should update partially a burger', async () => {
    const response = await client.patch("/burgers/1").send({name: "MagBurger"});
    expect(response.statusCode).toBe(200);
  });

  it("should delete a burger", async () => {
    const response = await client.delete("/burgers/1");
    expect(response.statusCode).toBe(200);
  });

  it("should return a 404 when burger is not found", async () => {
    const response = await client.get("/burgers/42069");
    expect(response.statusCode).toBe(404);
  });

  it("should return an error when only burger name is sent", async () => {
    const response = await client.post("/burgers/1").send({name: "MagBurger"});
    expect(response.statusCode).toBe(400);
  });

  it("should return an error when only burger price is sent", async () => {
    const response = await client.post("/burgers/1").send({price: 10.0});
    expect(response.statusCode).toBe(400);
  });
});
