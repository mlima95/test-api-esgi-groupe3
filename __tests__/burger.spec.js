const {sequelize} = require("../models");
const supertest = require("supertest");
const client = supertest(require("../app.js"));


let txn;
const testBurger = {id: 999, name: "MagBurger", price: 10.0};
const simpleUser = {id: 999, username: "Bob", password: "1secure2345", roles: ["USER"]};
const adminUser = {id: 9999, username: "Patrick", password: "1secure2345", roles: ["ADMIN"]};
const users = {
  USER: simpleUser,
  ADMIN: adminUser
}
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
  if(user) {
    await createUser(user);
    return await logUser(user);
  }
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
  const tokens = {
    USER: await createUserAndLog(users[role])
  }

  for(const role of  ["USER", "ADMIN", "INVALID"]) {
    it(`#(${role}) Should be 0 burger`, async () => {
      const response = await client.get("/burgers")
      .set("Authorization", "Bearer " + (await createUserAndLog(users[role]))?.body?.token || role);
      expect(response.statusCode).toBe(role === "INVALID" ? 401 : 200);
    });

    it(`#(${role}) should create a burger`, async () => {
      const response = await client.post("/burgers")
      .set("Authorization", "Bearer " + (await createUserAndLog(users[role]))?.body?.token || role)
      .send(testBurger);
      console.log(response.body, response.error);
      expect(response.statusCode).toBe(role === "INVALID" ? 401 : 201);
    });


  }




  // it("(User) should create a burger", async () => {
  //   const response = await client.post("/burgers")
  //   .set("Authorization", "Bearer " + (createUserAndLog(simpleUser)).body.token)
  //   .send(testBurger);
  //   expect(response.statusCode).toBe(201);
  // });

  
  // it("(User) should create a burger", async () => {
  //   const response = await client.post("/burgers")
  //   .set("Authorization", "Bearer " + (createUserAndLog(simpleUser)).body.token)
  //   .send(testBurger);
  //   expect(response.statusCode).toBe(201);
  // });
  
  // it("(User) should create a burger", async () => {
  //   const response = await client.post("/burgers")
  //   .set("Authorization", "Bearer " + (createUserAndLog(simpleUser)).body.token)
  //   .send(testBurger);
  //   expect(response.statusCode).toBe(201);
  // });
  // it("should update a burger", async () => {
  //   const response = await client.put(`/burgers/${testBurger.id}`).send(testBurger);
  //   expect(response.statusCode).toBe(200);
  // });

  // it('should update partially a burger', async () => {
  //   const response = await client.patch(`/burgers/${testBurger.id}`).send({name: "MagBurger"});
  //   expect(response.statusCode).toBe(200);
  // });

  // it("should delete a burger", async () => {
  //   const response = await client.delete(`/burgers/${testBurger.id}`);
  //   expect(response.statusCode).toBe(200);
  // });

  // it("should return a 404 when burger is not found", async () => {
  //   const response = await client.get(`/burgers/${testBurger.id+12}`);
  //   expect(response.statusCode).toBe(404);
  // });

  // it("should return an error when only burger name is sent", async () => {
  //   const response = await client.put(`/burgers/${testBurger.id}`).send({name: "MagBurger"});
  //   expect(response.statusCode).toBe(400);
  // });

  // it("should return an error when only burger price is sent", async () => {
  //   const response = await client.post(`/burgers/${testBurger.id}`).send({price: testBurger.price+1.0});
  //   expect(response.statusCode).toBe(400);
  // });

});




