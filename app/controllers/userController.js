const {User} = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
    displayLogin: (request, response) => {
        response.render('login');
    },

    validLogin: (request, response) => {
        //checker si un user existe bien en BDD avec l'email qui a été saisi
        User.findOne({
            where: {
                email: request.body.email
            }
        })
        .then(user => {
            //si non, on engueule l'utilisateur en lui disant de vérifier sa saisie
            if (!user) { // if (user === undefined || user === null || user === 0 || user ===false || user === '')
                //on n'a trouvé aucun user enregistré avec cet email
                return response.render('login', {error: 'Vérifiez votre saisie'})
            }

            

            //si oui
            //on va checker que le mot de passe en clair dans le formulaire matche avec la version chiffrée stockée en BDD
            const isPwdValid = bcrypt.compareSync(request.body.password, user.password)
            //si ça matche pas, on engueule l'utilisateur en lui disant de vérifier sa saisie
            if (isPwdValid === false) { // if (user === undefined || user === null || user === 0 || user ===false || user === '')
                //on n'a trouvé aucun user enregistré avec cet email
                return response.render('login', {error: 'Vérifiez votre saisie'})
            }
            //si ça matche, on continue
            //mise en place de la session de ce user pour faire persister le fait qu'il est connecté
            request.session.user = {
                name: user.fullname,
                email: user.email,
                role: user.role
            }

            //si remember a été coché, on donne une durée de vie de 1h à la session
            if (request.body.remember) {
                // l'utilisateur a coché la case 'se souvenir de moi'
                //on ajoute une durée de validité d'une heure à la session
                //il peut ainsi quitter son navigateur et revenir plus tard sur la page, les infos en session auront été conservées
                request.session.cookie.maxAge = 60 * 60 * 1000;
            }

            //c'est fini, on peut rediriger l'utilisateur sur la page d'accueil
            response.redirect('/');

        })
        .catch(error => {
            response.status(500).send(error.message);
        })
        
        ;
    },

    displaySignup: (request, response) => {
        response.render('signup');
    },

    validSignup: (request, response) => {
        //on checke si un utilisateur avec l'email saisi existe déjà en BDD
        User.findOne({
            where: {
                email: request.body.email
            }
        })
        .then(user => {
            if (user) { // if (user !== undefined)
                // il ya déjà un user avec cet email en BDD, on envoie une erreur
                return response.render('signup', {error: 'Un utilisateur avec cet email existe déjà'});
            }

            // on checke si le mot de passe et sa vérification correspondent
            if (request.body.password !== request.body.passwordConfirm) {
                //le password et la vérif ne matchent pas, on envoie une erreur
                return response.render('signup', {error: 'La confirmation du mot de passe est incorrecte'});
            }

            // on est bon sur les champs, on fait la version hashée du mot de passe
            // c'est cette version qu'on stockera en BDD
            const hashedPwd = bcrypt.hashSync(request.body.password, 10);

            //on enregistre un nouveau user en BDD
            //on crée une instance et on appelle la méthode save fournie par Sequelize
            const newUser = new User({
                email: request.body.email,
                password: hashedPwd,
                lastname: request.body.lastname,
                firstname: request.body.firstname
            });
            newUser.save()
            .then(user => {
                console.log(user);
                //l'utilisateur est créé et sauvegardé en BDD, on redirige vers la page de login
                response.redirect('/login');
            })
            .catch(error => {
                response.status(500).send(error.message);
            })

        })
        .catch(error => {
            response.status(500).send(error.message);
        })
    },





    disconnect: (request, response) => {
        //on reset le user en session
        request.session.user = false;
        //on redirige vers la page d'acueil
        response.redirect('/');
    }
};