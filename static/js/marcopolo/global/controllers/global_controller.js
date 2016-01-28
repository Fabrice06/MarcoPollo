(function () {
    'use strict';

    angular
        .module('marcopolo')
        .config(function ($translateProvider){
			$translateProvider.translations('en', {
				TITLE: 'Hello',
				BUTTON_LANG_EN: 'english',
				BUTTON_LANG_FR: 'french',
				PERSON_LOG_TITLE: 'Thank for connect',
				PERSON_LOG_MAIL: "Your email",
				PERSON_LOG_REQUIRED: "This field is required",
				PERSON_LOG_VALID: "Thank you to indicate a valid email address",
				PERSON_LOG_PASS: "Your password",
				PERSON_LOG_MESSAGE: "I lost my password",
				PERSON_LOG_NEW: "New user",
				PERSON_LOG_CONNECT: "Log in"
			});
			
			$translateProvider.translations('fr', {
				TITLE: 'Bonjour',
				BUTTON_LANG_EN: 'anglais',
				BUTTON_LANG_FR: 'français',
				PERSON_LOG_TITLE: 'Merci de vous connecter',
				PERSON_LOG_MAIL: "Votre email",
				PERSON_LOG_REQUIRED: "Ce champ est obligatoire",
				PERSON_LOG_VALID: "Merci d'indiquer une adresse e-mail valide",
				PERSON_LOG_PASS: "Votre mot de passe",
				PERSON_LOG_MESSAGE: "J'ai perdu mon mot de passe",
				PERSON_LOG_NEW: "Nouvel utilisateur",
				PERSON_LOG_CONNECT: "Se connecter"
			});
			
			$translateProvider.preferredLanguage('en');
		});
		
/* <p>{{'TITLE' | translate}}</p>  ou  <p translate="TITLE"></p>  */
	
	
	angular
        .module('marcopolo')
		.controller('globalCtrl', function ($scope, $translate) {
			$scope.changeLanguage = function (key) {
				$translate.use(key);
			};
		});
        
    } // function

)();