const CoreModel = require('./coreModel');

class Tag extends CoreModel {

    name;

    constructor(obj) {
        super(obj);
        this.name = obj.name;
    }
};

module.exports = Tag;