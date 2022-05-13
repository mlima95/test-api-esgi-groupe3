const {sequelize} = require("../models");
const supertest = require("supertest");
const client = supertest(require("../app.js"));
const users = require("../fixtures/user.json");
const burgers = require("../fixtures/burger.json");
const FixtureLoader = require("../fixtures/FixtureLoader.js");
const fs = require("fs/promises");
const ReferenceManager = require('../fixtures/ReferenceManager.js');

let txn;
const testBurger = {id: 999, name: "MagBurger", price: 10.0};
const roles = ["USER", "ADMIN", "INVALID"];

const createBurger = async () => {
    await FixtureLoader(
        await fs.realpath(__dirname + "/../fixtures/burger.json")
    );
};

const createUser = async () => {
    await FixtureLoader(
        await fs.realpath(__dirname + "/../fixtures/user.json")
    );
};

const logUser = async (usr) => {
    const credentials = {
        username: usr?.username,
        password: usr?.password
    };

    const a = await client.post("/login")
        .set("Content-Type", "application/json")
        .send(credentials);
    return a.body.token;
};


afterAll(async () => {
    await sequelize.close();
});
beforeEach(async () => {
    txn = await sequelize.transaction();
    sequelize.constructor['_cls'] = new Map();
    sequelize.constructor['_cls'].set('transaction', txn);
    await createUser();
});

afterEach(async () => {
    await txn.rollback();
});

describe('Burgers', () => {


    for (const role of roles) {
        it(`#(${role}) Should be 0 burger`, async () => {
            const user = ReferenceManager.getReference(role + ".fixture");
            const token = await logUser(user);
            const response = await client.get("/burgers")
                .set("authorization", "Bearer " + token);
            expect(response.statusCode).toBe(role === "INVALID" ? 401 : 200);
        });

        it(`#(${role}) should create a burger`, async () => {
            const user = ReferenceManager.getReference(role + ".fixture");
            const token = await logUser(user);
            const response = await client.post("/burgers")
                .set("authorization", "Bearer " + token)
                .set("Content-Type", "application/json")
                .send(testBurger);
            expect(response.statusCode).toBe(role === "INVALID" || role === "USER" ? 401 : 201);
        });

        it(`#(${role}) should update partially a burger`, async () => {
            await createBurger();
            const user = ReferenceManager.getReference(role + ".fixture");
            const burger = ReferenceManager.getReference("bigmac1.fixture");
            const token = await logUser(user);
            const response = await client.patch(`/burgers/${burger.id}`)
                .set("authorization", "Bearer " + token)
                .set("Content-Type", "application/json")
                .send({name: "MagBurger"});
            expect(response.statusCode).toBe(200);
        });

        // it(`#(${role}) should delete a burger`, async () => {
        //    await createBurger();
        //     expect(true).toBe(true);
        //     const token = await logUser(users.data[role]) || "";
        //
        //     const response = await client.delete(`/burgers/${burgers.data.bigmac1.id}`)
        //         .set("authorization", "Bearer " + token);
        //   expect(response.statusCode).toBe(200);
        // });
    }







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
