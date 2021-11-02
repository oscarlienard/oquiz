//on utilise un middleware maison pour initialiser la propriété user de la session à false
//si user existe dans la session, on va le rendre disponible à toutes nos vues

module.exports = (request, response, next) => {
    if (!request.session.user) { // on n'a pas encore de propriété user dans la session
        request.session.user = false

    }
    response.locals.user = request.session.user;
    next();
}