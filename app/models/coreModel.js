class CoreModel {

    static nbCoreModel = 0;

    static findAll() {
        //va chercher des infos en BDD
    }

    // avec le # devant le nom de la propriété, on protège l'accès à cette propriété depuis l'extérieur
    // tout élément de notre appli en dehors de la classe CoreModel (et de ses enfants) ne pourra plus lire directement la valeur de la propriété
    #id;

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