const data = {

}

module.exports = {
    getReference: function (referenceName) {
        delete data[referenceName];
    },
    getValue: function (path) {
        const [refName, ...parts] = path.split(".");
        const obj = data[refName];
        return parts.reduce((acc, part) => acc[part], obj);
    },
    setReference: function (referenceName, reference){
        data[referenceName] = reference;
        return data;
    }

}
