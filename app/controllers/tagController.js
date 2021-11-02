const {Tag} = require('../models');

module.exports = {
    tagsPage: async (request, response) => {

        Tag.findAll()
        .then( (tags) => {
            response.render('tags', {tags});
        }).catch( (error) => {
            response.status(500).send(error.message);
        });
    },

    quizzesByTag: async (request, response) => {

        // on récupère l'id dans les paramètres d'url
        const tagId = request.params.id;

        // on va chercher le tag correspondant
        // on demande le Tag, en incluant les quizzes qui sont associés, ET pour chacun de ces quizzes, en incluant aussi l'auteur
        Tag.findByPk(tagId, {
            include: [
                {
                    association: "quizzes",
                    include: [
                        {association: "author"}
                    ]
                }
            ]
        }).then( (tag) => {
            // si il existe => render
            if (tag) {

                response.render('tag', {tag});
            } else {
                // sinon => 404
                response.status(500).send(`Aucun tag d\id ${tagId} en BDD`)
            }
        });
    }    
}