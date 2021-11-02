//on charge les variables d'environnement
require('dotenv').config();

const express = require('express');
const router = require('./app/router');
const session = require('express-session');
const userMW = require('./app/middlewares/userMW');

const app = express();

// on utilise la variable d'environnement PORT pour attribuer un port de communication à notre appli
//en cas de pépin sur le chargement du .env, on se rabat sur la valeur par défaut
const port = process.env.PORT || 5000;

//configuration pour utiliser EJS comme moteur de template
app.set('view engine', 'ejs');
//le dossier views n'est pas à la racine du projet, on DOIT préciser à express où il peut le trouver
app.set('views', './app/views');


//on ajoute les ressources statiques
//on ne va pas utiliser les fichiers html tels quels mais des vues EJS
//le middleware static servira uniquement pour les fichiers css
app.use(express.static('./integration/css'));

//on va recevoir certaines données du user en POST
//elles seront stockées par express dans request.body MAIS il faut lui indiquer dans quel format il va les recevoir afin qu'il les décode correctement
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

//middleware maison pour initiliser la communication entre la session express et les vues EJS
app.use(userMW);

//TODO : ajouter un router
app.use(router);

//on lance le serveur
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});