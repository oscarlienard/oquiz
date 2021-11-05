const {Router} = require('express');

//TODO : controllers à importer
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const userController = require('./controllers/userController');
const tagController = require('./controllers/tagController');
const adminController = require('./controllers/adminController');

const adminMW = require('./middlewares/adminMW')

const router = Router();

//TODO : routes à définir

//page d'accueil
router.get('/', mainController.home);

//afficher le détails d'un quiz
router.get('/quiz/:id', quizController.quizDetails);
//analyser les réponses à un quiz
router.post('/quiz/:id', quizController.quizzAnswer);


//afficher le formulaire de login
router.get('/login', userController.displayLogin);

//traiter le formulaire de login
router.post('/login', userController.validLogin)


//afficher le formulaire de signup
router.get('/signup', userController.displaySignup);

//traiter le formulaire de signup
router.post('/signup', userController.validSignup)



//se déconnecter
router.get('/logout', userController.disconnect);

//afficher les tags
router.get('/tags', tagController.tagsPage);


//l'ordre des routes est important ici
//une route de format /tag/xxx peut matcher avec la route /tag/:id
//pour éviter les conflits, on place ces routes AVANT la route paramétrée

//ajout d'un tag
router.get('/tag/add', adminMW, tagController.addTagForm);
router.post('/tag/add', adminMW, tagController.addTagHandle);

//modifier un tag
router.get('/tag/select', adminMW, tagController.selectTag);
router.get('/tag/modify/:id', adminMW, tagController.modifyTagForm);
router.post('/tag/modify', adminMW, tagController.modifyTagHandle);

//Associer un tag à un quiz
router.get('/tag/associate', adminMW, tagController.associateTagForm);
router.post('/tag/associate', adminMW, tagController.associateTagHandle);


//afficher les quizzes d'un tag
router.get('/tag/:id', tagController.quizzesByTag);


//interface d'administration
//cette route sera protégée, gardée par le middleware adminMW
//seuls les utilisateurs connectés ET avec le role admin pourront accéder au middleware showInterface
router.get('/admin', adminMW, adminController.showInterface);




//on exporte le routeur pour l'utiliser dans le reste de l'appli
module.exports = router;