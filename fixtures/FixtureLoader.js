const db = require("../models");
const ReferenceManager = require("./ReferenceManager");

function interpolate(obj) {
    for (let key in obj) {
        if (typeof obj[key] === "string") {
            obj[key] = obj[key].replace(/\{\{\s*([^}]+)\s*\}\}/g, (match, name) => {
                return ReferenceManager.getValue(name);
            });
        }
        if (typeof obj[key] === "object") {
            obj[key] = interpolate(obj[key]);
        }
    }
    return obj;
}

module.exports = async function FixtureLoader(...paths) {
    for (let path of paths) {
        const fixture = require(path);
        const Model = db[fixture.model];
        for (let name in fixture.data) {
            const record = interpolate(fixture.data[name]);
            const model = await Model.create(record);
            ReferenceManager.setReference(name, model);
            ReferenceManager.setReference(name + ".fixture", record);

        }
    }
};
