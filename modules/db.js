const fs = require("fs");

const setNestedProperty = (object, key, value) => {
    const properties = key.split('.');
    let index = 0;
    for (; index < properties.length - 1; ++index) {
        object = object[properties[index]];
    }
    object[properties[index]] = value;
}

const getNestedProperty = (object, key) => {
    const properties = key.split('.');
    let index = 0;
    for (; index < properties.length; ++index) {
        object = object && object[properties[index]];
    }
    return object;
}

module.exports = class EasyJsonDB {
    constructor(filePath, options) {
        this.jsonFilePath = filePath || "./db.json";
        this.options = options || {};
        this.data = {};

        if (!fs.existsSync(this.jsonFilePath)) {
            fs.writeFileSync(this.jsonFilePath, "{}", "utf-8");
        } else {
            this.fetchDataFromFile();
        }
    }
    fetchDataFromFile() {
        const savedData = JSON.parse(fs.readFileSync(this.jsonFilePath));
        if (typeof savedData === "object") {
            this.data = savedData;
        }
    }
    saveDataToFile() {
        fs.writeFileSync(this.jsonFilePath, JSON.stringify(this.data, null, 2), "utf-8");
    }
    get(key) {
        return getNestedProperty(this.data, key);
    }
    has(key) {
        return Boolean(getNestedProperty(this.data, key));
    }
    set(key, value) {
        setNestedProperty(this.data, key, value);
        this.saveDataToFile();
    }
    delete(key) {
        delete this.data[key];
        this.saveDataToFile();
    }
    add(key, count) {
        if (!this.data[key]) this.data[key] = 0;
        this.data[key] += count;
        this.saveDataToFile();
    }
    subtract(key, count) {
        if (!this.data[key]) this.data[key] = 0;
        (this.data[key] -= count);
        this.saveDataToFile();
    }
    push(key, element) {
        if (!this.data[key]) this.data[key] = [];
        this.data[key].push(element);
        this.saveDataToFile();
    }
    pull(key, element) {
        this.data[key].splice(this.data[key].indexOf(element));
        this.saveDataToFile();
    }
    clear() {
        this.data = {};
        this.saveDataToFile();
    }
    all() {
        return Object.keys(this.data).map((key) => {
            return {
                key,
                data: this.data[key]
            }
        });
    }

};