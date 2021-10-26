class Quiz {
    id;
    title;
    description;
    user_id;

    constructor(obj) {
        this.id = obj.id;
        this.title = obj.title;
        this.description = obj.description;
        this.user_id = obj.user_id;
    }
}

module.exports = Quiz;