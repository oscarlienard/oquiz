const client = require('../database');


class CoreModel {

    // avec le # devant le nom de la propriété, on protège l'accès à cette propriété depuis l'extérieur
    // tout élément de notre appli en dehors de la classe CoreModel (et de ses enfants) ne pourra plus lire directement la valeur de la propriété
    #id;

    static tableName = null;

    constructor(obj) {
        this.#id = obj.id;
    }

    //getter nous permet de lire la valeur d'une propriété masquée
    //ça se déclare comme une méthode, ça s'utilise comme une propriété

    get id() {
        return this.#id;
    }

    // setter va permettre de mettre à jour la propriété cachée
    //on va pouvoir mettre un peu de logique pour vérifier qu'on ne met pas de valeur incohérente

    set id(value) {
        if (typeof value !== 'number') {
            console.log('Le champ id doit être de type number');
        } else {
            this.#id = value;
        }
    }


    static findAll(callback) {
        // console.log(`SELECT * FROM "${this.tableName}"`)
        client.query(`SELECT * FROM "${this.tableName}"`, (error, result) => {
            if (error) {
                callback(error);
            } else {
                const instances = [];
                for (const row of result.rows) {
                    instances.push(new this(row));
                }
                callback(null, instances);
            }

        });
    }

    static findOne(id, callback) {
        client.query(`SELECT * FROM "${this.tableName}" WHERE id=$1`, [id], (error, result) => {
            if (error) {
                callback(error);
            } else {
                if(result.rows[0]) { //équivalent à result.rows[0] !== undefined
                    const instance = new this(result.rows[0]);
                    callback(null, instance);
                } else {
                    // dans le cas contraire, on prévient le contrôleur avec un nouveau message d'erreur
                    callback(`${this.name} with id ${id} doesn't exist`);
                }
            }
        })
    }

    insert(callback) {
        //this.constructor, dans le contexte d'instance, contient une référence vers la classe qui a permis de fabriquer l'instance
        //on peut utiliser cette référence pour accéder aux propriétés statiques même dans ce contexte
        const tableName = this.constructor.tableName;
        console.log('this', this);
        console.log('this.constructor', this.constructor);
        console.log('tableName', this.constructor.tableName);

        // on déclare 3 tableaux pour stocker le nom des champs, la valeur des champs et leur position dans la requête

        const fieldNames = [];
        const fieldValues = [];
        const fieldPostions = []

        let count = 1;
        //on parcoure l'object courant avec une boucle for in pour accéder aux noms des propriétés
        //Attention, pour ces requêtes, on ne prend pas en compte l'id des enregistrements mais vu qu'on a été malin, que l'id dans le CoreModel est privé (masqué, pas accessible, ...) il n'apparaitra pas dans la boucle
        for (const propName in this) {
            console.log('Nom de la propriété :', propName);
            console.log('Valeur de la propriété :', this[propName]);
            fieldNames.push(`"${propName}"`);
            fieldValues.push(this[propName]);

            fieldPostions.push(`$${count}`);
            //fieldIndex.push('$' + count);
            count++;
        }

        console.log('names', fieldNames);
        console.log('values', fieldValues);
        console.log('positions', fieldPostions);

        const preparedQuery = {
            text: `INSERT INTO "${tableName}"(${fieldNames.join(', ')}) VALUES(${fieldPostions.join(', ')}) RETURNING id`,
            values: fieldValues
        }
        console.log('requête', preparedQuery.text);

        client.query(preparedQuery , (error, result) => {
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
        const tableName = this.constructor.tableName;

        const fieldUpdates = [];
        const values = [];

        let count = 1;

        for (const propName in this) {
            console.log('valuer du count dans la boucle', count);
            //on récupère déjà la valeur du champ
            values.push(this[propName]);
            //on crée le bout de string qui permettra la mise à jour de ce champ (<champ>=$x)
            fieldUpdates.push(`"${propName}"=$${count}`);
            count++;
        }
        console.log('valuer du count après la boucle', count);
        //après la boucle, on ajoute la dernière valeur nécessaire à la requête
        values.push(this.id);
        console.log('updates', fieldUpdates);
        console.log('values', values);

        // à la sortie de la boucle, on profite du fait que le compteur a été incrémenté une dernière fois pour indiquer la position du dernier champ nécessaire à la requête : l'id de l'enregistrement à modifier
        const preparedQuery = {
            text: `UPDATE "${tableName}" SET ${fieldUpdates.join(', ')} WHERE id=$${count}`,
            values
        }
        console.log(preparedQuery.text);
        client.query(preparedQuery, (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null, this);
            }
        })
    }

    // DELETE FROM <table> WHERE id=$1
    delete(callback) {
        client.query(`DELETE FROM "${this.constructor.tableName}" WHERE id=$1`, [this.id], (error, result) => {
            if (error) {
                callback(error);
            } else {
                if (result.rowCount > 0) {
                    console.log('Enregistrement supprimé');
                    callback(null, true);
                } else {
                    console.log('Enregistrement inexistant');
                    callback(null, false);
                }
            }

        });
    }

}

// const obj = {
//     id: 5,
//     name: 'facile'
// }

// const instance = new CoreModel(obj);
// console.log(instance.id);

// instance.id = 25;


// console.log('Valeur de l\'id', instance.id);



module.exports = CoreModel;