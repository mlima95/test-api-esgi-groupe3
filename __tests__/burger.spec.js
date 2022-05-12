const {sequelize} = require('../../src/models');

jest.spyOn(sequelize, 'transaction');

beforeEach(() => {
  jest.clearAllMocks();
});

describe("test Burger API", () => {
  it("should return all burgers", async () => {
  const response = await request(app).get("/burgers");
  console.trace(response);
  jest.spyOn(models.Burger, 'create');
  expect(response.statusCode).toBe(200);
  })
});
