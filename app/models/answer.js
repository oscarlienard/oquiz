class Answer {

    id;
    description;
    question_id;


    constructor(obj) {
        console.log('Je suis dans le constructor');
        this.id = obj.id;
        console.log(`J'ai donné la valeur ${obj.id} à ma propriété id : ${this.id}`);
        this.description = obj.description;
        this.question_id = obj.question_id;
    }

};

// const  obj = {
//     id: 25,
//     description: 'xxx',
//     question_id: 45
// };

// const answer = new Answer(obj);


module.exports = Answer;