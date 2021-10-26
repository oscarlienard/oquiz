require('dotenv').config();
const Level = require('./app/models/level');

const controller = {
    getAllLevels: (request, response) => {
        const callback = (error, levels) => {
            console.log('Je suis dans le callback controller<>Model')
            if (error) {
                console.log(error);
                //response.status(500).send('on a eu un pépin :' + error);
            } else {
                console.log('J\'ai reçu des data prêtes à l\'emploi de la part du modèle')
                for (const level of levels) {
                    console.log(level.niceDebug())
                }
                //response.send(levels);
            }
        };
        Level.findAll(callback)
    },

    getOneLevel: (request, response) => {
        const id = 2465465657;
        Level.findOne(id, (error, level) => {
            if (error) {
                console.log(error.message);
            } else {
                console.log(level.niceDebug());
            }
        })
    },

/*
    {
        name: 'super trop dur'
    }
*/

    insertLevel: (request, response) => {
        const level = new Level({name: 'super trop dur'});
        level.insert((error, newLevel) => {
            if (error) {
                console.log(error);
            } else {
                console.log(newLevel.niceDebug());
            }
        });
    }
}

controller.insertLevel();