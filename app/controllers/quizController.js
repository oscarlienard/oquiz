const {Quiz} = require('../models');

module.exports = {
    // quizDetails: (request, response) => {
    //     //on a une url paramétrée pour accéder à cette méthode, on commence par récupérer la valeur des paramètres
    //     /*
    //     3 façons de transformer notre paramètre en number :
    //     - parseInt(request.params.id, 10) : 15px -> 15; '123.495' -> 123
    //     - Number(request.params.id) '123.495' -> 123.495
    //     - +(request.params.id)
    //     */
    //     const quizId = +request.params.id;

    //     Quiz.findByPk(quizId, {
    //         //pour les infos supplémentaires nécessaires à notre vue, on utilise include pour joindre les infos d'autres tables au quiz qu'on a récupéré
    //         //on commence par les associations en lien direct avec l'entité Quiz sur le MCD
    //         include: ['author', 'tags', {
    //             //on utilise la notation object pour l'assoc questions because :
    //             //- on a besoin d'ajouter des infos à chaque question du quiz
    //             //- on n'a pas de lien direct entre Quiz et Level ou Answer
    //             association: 'questions',
    //             //on ajoute l'info du niveau et des réponses possibles A CHAQUE question qu'on récupère dans l'association questions
    //             include: ['level', 'answers']
    //         }]
    //     })
    //     .then(quiz => {

    //         /*
    //         const quiz = {
    //             id
    //             title
    //             description
    //             author: {
    //                 id
    //                 email
    //                 password
    //                 ...
    //             }
    //             tags: [{id, name}, {id, name}, {}]
    //             questions: [{
    //                 id,
    //                 question,
    //                 level: {id, name}
    //                 answers: [{id, description}, {}, {}]
    //             }, {}, {}, ...]
    //         }
    //         */


    //         response.render('quiz', {quiz});

    //     })
    //     .catch(error => {
    //         response.status(500).send(error.message);
    //     })
    // ,}

    quizDetails: async (request, response) => {

        const quizId = +request.params.id;

        try {
            const quiz = await Quiz.findByPk(quizId, {
                include: ['author', 'tags', {
                    association: 'questions',
                    include: ['level', 'answers']
                }]
            });
            response.render(request.session.user ? 'play_quiz' : 'quiz', { quiz });
            //j'utilise une condition ternaire pour mon test ici
            //l'équivlent "normal" serait 
            /*
            if (requestion.session.user) {
                //user connecté, il peut répondre aux questions
                result.render('play_quiz', {quiz});
            } else {
                //user non connecté, il ne peut pas répondre aux questions
                result.render('quiz', {quiz});
            }
            */
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    quizzAnswer: async (request, response) => {
		const quizId = parseInt(request.params.id);
		// on resélectionne le quiz concerné en ajoutant la relation good_answer pour chaque question
		//Rappel : cette relation va inclure pour chaque question un object Answer contenant les infos de la bonne réponse
		const quiz = await Quiz.findByPk(quizId, {
			include: ['author', 'tags',
				{ association: 'questions', include: ['good_answer', 'answers', 'level'] }
			]
		});
		//on va stocker ici des informations sur chaque réponse de l'utilisateur afin de les passer à la vue
		const answers = [];
		//un compteur pour le nombre de points, chaque bonne réponse vaut 1
		let nbPoints = 0;
		//on boucle sur les questions du quiz et on compare
		for (const question of quiz.questions) {
			/*
			Rappel : request.body va être de la forme
				request.body.question_<id_question>: <id_reponse_user_string>

				request.body.question_1: '25',
				request.body.question_32: '12',
				request.body.question_45: '63',
				...
			*/
			//on détermine si l'id de la bonne réponse correpond à la sélection du user
			//les infos reçues d'un formulaire sont toujours sous forme de string, on utilise parseInt pour effectuer la comparaison
			const isGood = question.good_answer.id === parseInt(request.body[`question_${question.id}`]);
			if (isGood) {
				//le user a donné la bonne réponse, on lui donne 1 point de plus
				nbPoints++;
			}
			//on ajoute pour cette question des infos dans le tableau answers
			//pour la question du quiz d'index X correspndra une entrée d'index X dans le tableau answers
			answers.push({ 
				//bonne réponse
				question_answer: question.good_answer.id, 
				//réponse du user
				user_answer: parseInt(request.body[`question_${question.id}`]), 
				//boolean indiquant si le user a trouvé la bonne réponse
				isGood 
			});
		}
		//en sortie de boucle, on affiche la vue score avec comme data :
		//- le quiz récupéré de la BDD
		//- le tableau aswers avec des infos sur la réponse à chaque question
		//- le nombre de points
		response.render('score', { quiz, answers, nbPoints });
	}
}
