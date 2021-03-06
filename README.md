## Jour 7 : Parcours, Sprint 3

### Pouvoir répondre aux questions d’un quiz

- Commencer par dupliquer la view 'quiz'. Renommer la copie "play_quiz"
- Transformer la view "play_quiz" pour qu'elle contienne un formulaire POST.
- Chaque réponse possible doit être un bouton radio.
- Nommer correctement les boutons radio pour qu'on ne puisse pas choisir plusieurs réponses à la même question.
- Mais on doit quand même pouvoir répondre à toutes les questions !

<details>
<summary>Un peu d'aide</summary>

Voici à quoi doit ressembler le HTML "renderisé" :

```HTML
<div class="col-12">
    <label class="badge level level--débutant">Débutant</label>
    <h4>
        Dans le film d'animation L'Âge de glace, qu'est-ce qui échappe à l'écureuil Scrat ?
    </h4>
    <ul class="list-unstyled ml-5">
        <li>
            <input type="radio" name="question_1" id="answer_1_1" value="1">
            <label for="answer_1_1">Un gland</label>
        </li>
        <li>
            <input type="radio" name="question_1" id="answer_1_2" value="2">
            <label for="answer_1_2">Une pierre</label>
        </li>
        <li>
            <input type="radio" name="question_1" id="answer_1_3" value="3">
            <label for="answer_1_3">Un os</label>
        </li>
        <li>
            <input type="radio" name="question_1" id="answer_1_4" value="4">
            <label for="answer_1_4">Une bille</label>
        </li>
    </ul>
</div>
```
</details>

Dans la route `/quiz/:id`, tester si un utilisateur est connecté. Si c'est le cas, on renvoie la view "play_quiz". Sinon on renvoie la view sans formulaire ("quiz")

Coder ensuite la route POST qui va gérer la soumission du formulaire.

### Pouvoir visualiser mon score

Dans la route qui gère la soumission du formulaire, comparer les données utilisateurs aux bonnes réponses des questions du Quizz.

Chaque bonne réponse donne un point (on ne s'occupe pas de la difficulté de la question).

Renvoyer ensuite une belle view avec le résultat !

### Pouvoir visualiser les bonnes et mauvaises réponses que j’ai donné

Modifier la view précédente pour y intégrer quelles étaient les bonnes et les mauvaises réponses de l'utilisateur.

### Bonus 1 : Ajouter un nouveau Tag

CETTE FONCTIONNALITÉ NE DOIT ÊTRE ACCESSIBLE QU'AUX ADMINS !

- 2 nouvelles routes ("get" et "post")
- un formulaire
- ¯\\\_(ツ)_/¯ pour le reste à toi de jouer.

### Bonus 2 : Modifier un Tag existant

CETTE FONCTIONNALITÉ NE DOIT ÊTRE ACCESSIBLE QU'AUX ADMINS !

### Bonus 3 (AKA "bonus de la mort") : Associer un Tag à un Quiz

CETTE FONCTIONNALITÉ NE DOIT ÊTRE ACCESSIBLE QU'AUX ADMINS !

---

## Jour 6 : Promesses !

Votre mission du jour : terminer la transformation des middlewares dans les contrôleurs de l'appli

Les seuls middlewares à modifier sont ceux qui font des requêtes vers la BDD

## Jour 5 : formulaire d'inscription

En vous inspirant de ce qu'on a fait pour la vue login, mettez en place la vue signup et le traitement adéquat :
- ajouter une route en GET pour afficher la vue signup
- ajouter une route en POST pour traiter les infos du formulaire :
  - vérifier si un user existe déjà avec l'email indiqué
  - si oui, on engueule l'utilisateur avec un message d'erreur
  - si non, on continue
  - vérifier si les 2 champs de mot de passe contiennent bien la même info
  - si non, on engueule l'utilisateur
  - si oui on continue
  - chiffrer le mot de passe en clair avec la méthode hashSync de [bcrypt](https://www.npmjs.com/package/bcrypt)
  - créer une insance de user avec les infos saisies et le mot de passe chiffrer
  - sauvegarder ce nouveau user en BDD
  - rediriger l'utilisateur sur la page de login

N'hésitez pas à multiplier les console.log pour voir par où vous passez, dans quel ordre et ce que contiennent vos variables

ATTENTION : n'oubliez pas de rajouter la colonne role à la table user

---

## Jour 4 : Atelier, Sprint 1

Fini les tests ! Maintenant qu'on a des super modèles, on va brancher tout ça dans une archi Express !

### Mise en place de l'archi

- npm est votre ami : installer les dépendances nécessaires
- point d'entrée de l'application : `index.js` (on y fait les réglages habituels pour express)
- un router (dans `app`)
- un dossier controllers (dans `app`)
- un controller `mainController`
- on oublie pas les fichiers statiques (notamment le CSS)
- et plus si nécessaire...

### Page d'accueil

L'intégration est fournie !

Commencer par découper l'intégration en views façon EJS.
Pensez à supprimer les fichiers html, si vous définissez le repertoire `integration/` comme répertoire des statiques.
Sinon vous allez afficher par défaut le contenu du fichier `index.html` lors de l'appel à `http://localhost:xxxx/`

Ensuite, créer la route et la méthode correspondante dans le controller "mainController".

### Visualiser les titres, les sous-titres et les auteurs des quizzes sur la page d’accueil

Remplacer les fausses données "en dur" par les données issues des Models !

Ici, se servir de Sequelize est une bonne idée (cf [les associations](https://sequelize.org/master/manual/eager-loading.html)).

### Pouvoir accéder aux questions d’un quiz

Il va falloir une nouvelle route (`/quiz/:id`).

Coder la méthode correspondante dans un nouveau controlleur (`quizController`).

Ici aussi, Sequelize va être bien pratique...

1. pouvoir visualiser la difficulté de chaque question

2. visualiser tous les sujets rattachés au quiz

### pouvoir visualiser tous les sujets

Nouvelle route (`/tags`)

Nouveau controller (`tagController`)

### pouvoir visualiser tous les quizzes pour un sujet donné

Astuce : utiliser le model Tag, et se servir des "includes" de Sequelize pour en déduire les quizzes concernées !

### :v: Bonus facile : Ajouter tous les liens qui pourraent manqués

Il y a surement des endroits ou il serait intéressant de pouvoir cliquer, afin de rendre la navigation plus fluide.

### :skull_and_crossbones::clock4: Bonus de la mort où j'ai une semaine devant moi et je savais pas quoi faire : formulaires

Rajouter les formulaires d'inscription et de connexion.
Avec tout ce qui est nécessaire (Ajout en base de données, login en session plus ou moins longue)

---

## Jour 3 : Sequelize !

Pas de challenge

---

# oQuiz - Challenge jour 4 : Active Record factorisé

Les méthodes Active Record sont maintenant factorisé directement dans CoreModel !!

Commencer par vérifier que tout fonctionne en écrivant quelques tests dans `test.js`, par exemple : 
- Trouver tous les User.
- Trouver la question dont l'id est 3.
- Créer un Level avec le nom "très difficile" et l'insérer en BDD.
- ...

Ensuite, rajouter 2 méthodes dans CoreModel : 
- `findBy(params, callback)` qui trouve les modèles correspondants à tous les paramètres passées dans le premier argument.
<details>
<summary>Un exemple</summary>

```js
Level.findBy({name:"difficile"}, callback); // trouve le(s) level(s) dont le nom est "difficile"
User.findBy({email: "michel@oclock.io"}, callback); // trouve le(s) user(s) dont l'email est "michel@oclock.io"
Tag.findBy({
  name: "Histoire"
}, callback); // trouve le(s) tag(s) dont le name est "Histoire".

```
</details>

- `save(callback)` : cette méthode appelle soit `insert` soit `update`, selon que l'instance existe déjà dans la BDD ou pas.

---

# oQuiz - Challenge jour 3 : Active Record

Les méthodes Active Record du modèle `Level` ont été presque codées.

On a pu vérifier que ces méthodes fonctionnent en jouant dans `pseudoControllerAR.js`.

En s'inspirant (très largement) de ce code existant, on passe à la suite, à savoir coder les méthodes Active Record du modèle `User` : 
- `findAll(callback)`, qui trouve tous les Users dans la base de données.
- `findById(id, callback)`, qui trouve un User en fonction de son ID.
- `insert(callback)`, qui insert l'instance courante dans la base de données.
- `update(callback)`, qui met à jour l'instance courante dans la base de données.
- `delete(callback)`, qui supprime l'instance courante de la base de données.

En bonus, commencer à réfléchir pour factoriser tout ce code (c'est-à-dire coder toutes les méthodes Active Record dans CoreModel !)

---

# oQuiz - Challenge jour 2 : Le début du commencement

Pour commencer, il faut mettre en place la base de données !

Les choses à faire, dans l'ordre :

- Créer un utilisateur PostgreSQL, nommé "oquiz", avec un mot de passe et les droits nécessaires.
- Créer une base de données nommée "oquiz", dont le propriétaire est l'utilisateur "oquiz".
- Créer les tables grâce au fichier "import_tables.sql".
- Importer les données grâce au fichier "import_data.sql".

<details>
<summary>Je me rappelle plus trop des commandes...</summary>

### Créer un utilisateur PostgreSQL, nommé "oquizz", avec un mot de passe et les droits nécessaires.

- d'abord se connecter à PostgreSQL en tant que "postgres": `sudo -i -u postgres`, puis `psql`
- Ou directement si cela est déjà configurer dans le `pg_hba.conf` vous pouvez directement untiliser la commande `psql -U postgres`
- puis créer l'utilisateur : `CREATE ROLE oquiz WITH LOGIN PASSWORD 'oquiz';`

### Créer une base de données nommée "oquizz", dont le propriétaire est l'utilisateur "oquiz".

- puis créer l'utilisateur : `CREATE DATABASE oquiz OWNER oquiz;`

### Créer les tables grâce au fichier "import_tables.sql".

- `psql -U oquiz -f data/import_tables.sql`

### Importer les données grâce au fichier "import_data.sql".

- `psql -U oquiz -f data/import_data.sql`

</details>

On pourra ensuite se connecter à la BDD dans le code via l'url : `postgres://oquiz:oquiz@localhost/oquiz`

## Du code classe !

Créer un dossier `app`, puis un sous-dossier `app/models`.

Dans ce dossier, on va coder des classes à partir du MLD du projet :

- une classe par entité: `Answer`, `Level`, `Question`, `Quiz`, `Tag`, et `User`
- une seule classe par fichier ! Le fichier porte le même nom que la classe, en minuscule.

Dans chaque classe :

- déclarer une propriété pour chaque champ de la table correspondante.
- coder un `constructor` qui prend en paramètre un objet. Cet objet contient toutes les valeurs à recopier dans l'instance.
- ne pas oublier d'exporter la classe !

<details>
<summary>Heuuu oui... t'as un exemple ?</summary>

Le but, c'est d'arriver à faire ça :

```JS

const monTag = new Tag({
  name: "un super tag",
});
```

On devrait donc avoir un truc dans ce genre :

```JS
class Tag {
  constructor(obj) {
    this.name = obj.name;
  }
};
```

</details>

## Do not repeat yourself

La propriété `id` est présente dans toutes les classes.

On va donc... les factoriser ! Et pour ce faire, on va utiliser l'héritage !

On va donc coder une class `CoreModel`, dans le même dossier que les autres, et toutes les classes vont _hériter_ de celle-ci :

- Penser à exporter `CoreModel`.
- Penser à require `CoreModel` dans les autres fichiers.
- Penser à appeler le "constructeur parent" dans les constructeur des classes.



# Oquiz, challenge jour 1

En utilisant l'analyse préliminaire de la BDD, le [MCD](https://kourou.oclock.io/ressources/fiche-recap/mcd-modele-conceptuel-de-donnees/), et la [fiche récap MLD](https://kourou.oclock.io/ressources/fiche-recap/mld/), écrire le MLD de l'application !

## Bonus

Écrire le fichier SQL pour créer les tables listées dans le MLD.
