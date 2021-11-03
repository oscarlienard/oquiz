const {Quiz} = require('../models');

module.exports = {
    // quizDetails: (request, response) => {
    //     //on a une url paramétrée pour accéder à cette méthode, on commence par récupérer la valeur des paramètres
    //     /*
    //     3 façons de transformer notre paramètre en number :
    //     - parseInt(request.params.id, 10) : 15px -> 15; '123.495' -> 123
    //     - Number(request.params.id) '123.495' -> 123.495
    //     - +(request.params.id)
    //     */
    //     const quizId = +request.params.id;

    //     Quiz.findByPk(quizId, {
    //         //pour les infos supplémentaires nécessaires à notre vue, on utilise include pour joindre les infos d'autres tables au quiz qu'on a récupéré
    //         //on commence par les associations en lien direct avec l'entité Quiz sur le MCD
    //         include: ['author', 'tags', {
    //             //on utilise la notation object pour l'assoc questions because :
    //             //- on a besoin d'ajouter des infos à chaque question du quiz
    //             //- on n'a pas de lien direct entre Quiz et Level ou Answer
    //             association: 'questions',
    //             //on ajoute l'info du niveau et des réponses possibles A CHAQUE question qu'on récupère dans l'association questions
    //             include: ['level', 'answers']
    //         }]
    //     })
    //     .then(quiz => {

    //         /*
    //         const quiz = {
    //             id
    //             title
    //             description
    //             author: {
    //                 id
    //                 email
    //                 password
    //                 ...
    //             }
    //             tags: [{id, name}, {id, name}, {}]
    //             questions: [{
    //                 id,
    //                 question,
    //                 level: {id, name}
    //                 answers: [{id, description}, {}, {}]
    //             }, {}, {}, ...]
    //         }
    //         */


    //         response.render('quiz', {quiz});

    //     })
    //     .catch(error => {
    //         response.status(500).send(error.message);
    //     })
    // ,}

    quizDetails: async (request, response) => {

        const quizId = +request.params.id;

        try {
            const quiz = await Quiz.findByPk(quizId, {
                include: ['author', 'tags', {
                    association: 'questions',
                    include: ['level', 'answers']
                }]
            });
            response.render('quiz', {quiz});
        } catch(error) {
            response.status(500).send(error.message);
        }
    }
}
