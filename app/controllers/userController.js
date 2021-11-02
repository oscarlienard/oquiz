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

    disconnect: (request, response) => {
        //on reset le user en session
        request.session.user = false;
        //on redirige vers la page d'acueil
        response.redirect('/');
    }
};