const {Tag, Quiz} = require('../models');

module.exports = {
    // tagsPage: async (request, response) => {

    //     Tag.findAll()
    //     .then( (tags) => {
    //         response.render('tags', {tags});
    //     }).catch( (error) => {
    //         response.status(500).send(error.message);
    //     });
    // },

    tagsPage: async (request, response) => {
        try {
            const tags = await Tag.findAll();
            response.render('tags', {tags});
        } catch (error) {
            response.status(500).send(error.message);
        }
    },



    // quizzesByTag: async (request, response) => {

    //     // on récupère l'id dans les paramètres d'url
    //     const tagId = request.params.id;

    //     // on va chercher le tag correspondant
    //     // on demande le Tag, en incluant les quizzes qui sont associés, ET pour chacun de ces quizzes, en incluant aussi l'auteur
    //     Tag.findByPk(tagId, {
    //         include: [
    //             {
    //                 association: "quizzes",
    //                 include: [
    //                     {association: "author"}
    //                 ]
    //             }
    //         ]
    //     }).then( (tag) => {
    //         // si il existe => render
    //         if (tag) {

    //             response.render('tag', {tag});
    //         } else {
    //             // sinon => 404
    //             response.status(500).send(`Aucun tag d\id ${tagId} en BDD`)
    //         }
    //     });
    // }    

    quizzesByTag: async (request, response) => {

        // on récupère l'id dans les paramètres d'url
        const tagId = +request.params.id;

        // on va chercher le tag correspondant
        // on demande le Tag, en incluant les quizzes qui sont associés, ET pour chacun de ces quizzes, en incluant aussi l'auteur
        
        try {
            const tag = await Tag.findByPk(tagId, {
                include: [
                    {
                        association: "quizzes",
                        include: [
                            {association: "author"}
                        ]
                    }
                ]
            });
            // si il existe => render
            if (tag) {
    
                response.render('tag', {tag});
            } else {
                // sinon => 404
                response.status(500).send(`Aucun tag d\id ${tagId} en BDD`)
            }
        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    addTagForm: (request, response) => {
        response.render('addTag');
    },

    //pour gérer l'ajout de couleur, on ne peut pas modifier à chaud le fichier CSS
    //on ajoute un champ color sur la table tag et dans les vues on va tester :
    //- si la couleur est renseignée en base, on l'utilise
    //- sinon, on utilise la classe CSS
    // ALTER TABLE "tag" ADD COLUMN "color" TEXT NULL;
    addTagHandle: async (request, response) => {
        try {
            //on vérifie qu'un tag avec ce titre n'existe pas déjà
            const tag = await Tag.findOne({where: {name: request.body.name}});
            if (tag) {
                //le tag existe déjà, on réaffiche le formulaire avec une erreur
                //pour l'UX, on réaffiche les infos saisies par l'utilisateur
                //on utilise return pour sortir de la méthode et ne pas exécuter le reste du code
                return response.render('addTag', {error: 'Ce tag existe déjà', fields: request.body});

            }
            //on ajoute le tag en BDD
            await Tag.create({
                name: request.body.name,
                color: request.body.color
            })
            //on réaffiche le formulaire vide en ajoutant un message indiquant au user que la requête a été exécutée
            return response.render('addTag', {result: `Le tag ${request.body.name} a été ajouté`});
        } catch (error) {
            response.status(500).send(error);
        }
    },

    selectTag: async (request, response) => {
        try {
            const tags = await Tag.findAll();
            response.render('selectTag', {tags});
        } catch (error) {
            response.status(500).send(error);
        }
    },

    //la gestion des couleurs serait un peu complexe ici, on ne la prend pas en compte
    modifyTagForm: async (request, response) => {
        try {
            const tagId = parseInt(request.params.id, 10);
            console.log('Getting tag with id', tagId);
            const tag = await Tag.findByPk(tagId);
            console.log(tag);
            response.render('modifyTag', {tag});
        } catch (error) {
            response.status(500).send(error);
        }
    },

    modifyTagHandle: async (request, response) => {
        try {
            const tag = await Tag.update({name: request.body.name}, {where: {id: parseInt(request.body.id, 10)}});
            response.redirect('/tags');
        } catch(error) {
            response.render('modifyTag', {error: error.message});
        }
    },

    associateTagForm: async (request, response) => {
        console.log('here');
        try {
            const quizzes = await Quiz.findAll();
            const tags = await Tag.findAll();
            response.render('associateTag', {tags, quizzes, error: request.query.error});
        } catch(error) {
            response.status(500).send(error);
        }
    },

    associateTagHandle: async (request, response) => {
        console.log(request.body)
        try {
            const quiz = await Quiz.findByPk(parseInt(request.body.quiz, 10), {
                include: 'tags'
            });
            if (quiz.tags.find(tag => tag.id === +request.body.tag))
                return response.redirect('/tag/associate?error=Cette association existe déjà');
            //on checke si le tag est déjà associé au quiz
            // const existingTag = quiz.tags.find(el => el.id === parseInt(request.body.tag, 10));
            // if (existingTag)
            //     return response.redirect('/tag/associate?error=Cette association existe déjà');
            // const tag = await Tag.findByPk(parseInt(request.body.tag, 10));
            // console.log(tag);
            //https://sequelize.org/master/manual/advanced-many-to-many.html
            //https://sequelize.org/master/manual/assocs.html#special-methods-mixins-added-to-instances
            //Pour une relation n,n, Sequelize ajoute une méthode add<Model> à chaque instance d'une entité
            //Dans notre cas, une instance de quiz a une méthode addTag, une instance de Tag a une méthode addQuiz
            console.log('there');
            const tag = await Tag.findByPk(request.body.tag);
            await quiz.addTag(tag);
            console.log('redirect');
            response.redirect('/quiz/'+request.body.quiz);
        } catch(error) {
            response.status(500).send(error);
        }
    }
}