module.exports = (request, response, next) => {
    if (!request.session.user) {
        console.log("yo1");
        //user non connecté, on le redirige sur la page login
        response.redirect('/login');
    } else {
        //le user est connecté
        if (request.session.user.role === 'admin') {
            console.log("yo2");
            next();
        } else {
            response.render('401');
        }
    }
}