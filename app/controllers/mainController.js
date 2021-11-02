const {Quiz} = require('../models');


module.exports = {
    home: (request, response) => {
        //requête vers la BDD pour récupérer tous les quizzes ET leur auteur

        Quiz.findAll({
            include: 'author'
        }).then(quizzes => {
            console.log('ayé, la BDD m\'a répondu');
            response.render('index', {quizzes});

        }).catch(error => {
            console.log(error.message);
            response.status(500).send(error.message);
        });

        // ATTENTION : tout code placé en dehors de la fonction du .then sera exécuté AVANT d'avoir eu un résultat de la BDD
        console.log('Je suis en dehors des callbacks de la requête');
    }
};