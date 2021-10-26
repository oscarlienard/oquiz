const Answer = require("./app/models/answer");

const controller = {
    getAllAnswers: (request, response) => {
        //faire une requête à la BDD pour récupérer un tableau d'enregistrements
        const answers = [];
        for (const row of result.rows) {
            /*
            row = {
                id: 1,
                description: 'xxx',
                question_id = 5
            }
            */
           answers.push(new Answer(row));
        }
    }
}