const CoreModel = require('./coreModel');
const client = require('../database');

class Level extends CoreModel {

    name;

    constructor(obj) {
        super(obj);
        this.name = obj.name;
    }
    // CRUD Create Read Update Delete

    // pour récupérer tous les levels stockés en base, on est dans le sens BDD -> JS, on a besoin d'une méthode statique (qu'on va appeler à partir de la classe et non pas d'un instance)
    static findAll(callback) {
        client.query('SELECT * FROM level', (error, result) => {
            // plutôt que de laisser le contrôleur manipuler des data pour les mettre en forme, on reste SoC et on le laisse le modèle effectuer le formatage
            console.log('Je suis dans le callback Model<>BDD');
            if (error) {
                callback(error);
            } else {
                console.log('J\'ai reçu des données brutes de la BDD, je les mets en forme avant de les passer au controller');
                const levels = [];
                for (const row of result.rows) {
                    levels.push(new Level(row));
                }
                callback(null, levels);
            }

        })
    }

    static findOne(id, callback) {
        client.query('SELECT * FROM level WHERE id=$1', [id], (error, result) => {
            if (error) {
                callback(error);
            } else {
                //on a un risque que l'id fournie en argument ne corresponde à aucun enregistrement en BDD
                //on sécurise notre code en vérifiant avant de créer l'instance qu'on a bien des infos dans result.rows[0]

                if(result.rows[0]) { //équivalent à result.rows[0] !== undefined
                    const level = new Level(result.rows[0]);
                    callback(null, level);
                } else {
                    // dans le cas contraire, on prévient le contrôleur avec un nouveau message d'erreur
                    callback(`Level with id ${id} doen't exist`);
                }
            }
        })
    }

    insert(callback) {
        //dans la requête on utilise RETURNING pour récupérer le nouvel id généré par postgres quand on va insérer un nouvel enregistrement
        console.log('this, avant la sauvegarde, contient', this);


        client.query('INSERT INTO level(name) VALUES($1) RETURNING id', [this.name], (error, result) => {
            if (error) {
                callback(error);
            } else {
                const newId = result.rows[0].id;
                this.id = newId;
                console.log('this, après la sauvegarde, contient', this);
                callback(null, this);
            }
        })
    }

    update(callback) {

    }

    delete(callback) {
        
    }



    niceDebug() {
        return `Level d'id ${this.id} : ${this.name}`;
    }
};


module.exports = Level;