class User {
    id;
    email;
    password;
    firstname;
    lastname;

    constructor(obj) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }
}

module.exports = User;