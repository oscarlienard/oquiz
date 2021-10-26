class Question {

    id;
    question;
    anecdote;
    wiki;
    level_id;
    answer_id;
    quiz_id;

    constructor(obj) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }
}

module.exports = Question;