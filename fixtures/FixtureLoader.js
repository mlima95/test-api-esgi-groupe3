const db = require("../models");
const ReferenceManager = require("./ReferenceManager");

module.exports = async function FixtureLoader(...paths) {
    for (let path of paths) {
        const fixture = require(path);
        const Model = db[fixture.model];
        for (let name in fixture.data) {
            const model = await Model.create(fixture.data[name]);
            ReferenceManager.setReference(name, model);
        }
    }
}
