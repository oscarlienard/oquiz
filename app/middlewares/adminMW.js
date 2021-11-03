module.exports = (request, response, next) => {
    if (!request.session.user) {
        //user non connecté, on le redirige sur la page login
        response.redirect('/login');
    } else {
        //le user est connecté
        if (request.session.user.role === 'admin') {
            next();
        } else {
            response.render('401');
        }
    }
}