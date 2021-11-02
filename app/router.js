const {Router} = require('express');

//TODO : controllers à importer
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const userController = require('./controllers/userController');
const tagController = require('./controllers/tagController');

const router = Router();

//TODO : routes à définir

//page d'accueil
router.get('/', mainController.home);

//détails d'un quiz
router.get('/quiz/:id', quizController.quizDetails);

//afficher le formulaire de login
router.get('/login', userController.displayLogin);

//traiter le formulaire de login
router.post('/login', userController.validLogin)

//se déconnecter
router.get('/logout', userController.disconnect);

//afficher les tags
router.get('/tags', tagController.tagsPage);

//afficher les quizzes d'un tag
router.get('/tag/:id', tagController.quizzesByTag);


//on exporte le routeur pour l'utiliser dans le reste de l'appli
module.exports = router;