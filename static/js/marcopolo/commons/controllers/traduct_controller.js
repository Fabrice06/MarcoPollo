(function () {
    'use strict';

    angular
        .module('marcopolo')
        .config(function ($translateProvider){
			$translateProvider.translations('en', {
				PERSON_LOG_WELCOME1: 'Welcome to Marco Polo',
				PERSON_LOG_WELCOME: "Join us and handle your bookmarks in your own way !",
				BUTTON_LANG_EN: 'English',
				BUTTON_LANG_FR: 'French',
				PERSON_LOG_TITLE: 'Get identified and retrieve your bookmarks list',
				PERSON_LOG_MAIL: "Email address",
				PERSON_LOG_REQUIRED: "This field is required",
				PERSON_LOG_VALID: "Thank you for indicating a valid email address",
				PERSON_LOG_PASS: "Password",
				PERSON_LOG_MESSAGE: "I forgot my password !",
				PERSON_LOG_NEW: "Still don't have an account ?",
				PERSON_LOG_CONNECT: "Log in",				
				PERSON_LOG_LOGIN_ERROR: "login and/or password is not correct",				
				PERSON_LOG_MINLENGTH: "The password must contain at least 3 caracters",
				PERSON_LOG_MAXLENGTH: "The password must not exceed 20 caracters",
				PERSON_LOG_WHO: "About us",
				PERSON_LOG_CONTACT: "Contact us",
				PERSON_DETAIL_PROFILE: "Update my profile",
				ADD: "Add",
				PROFILE: "My profile",				
				LOGOUT: "Log out",
				CANCEL: "Cancel",
				DELETE: "Delete",
				UPDATE: "Update"
			});
			
			$translateProvider.translations('fr', {
				PERSON_LOG_WELCOME1: 'Bienvenue sur Marcopolo',
				PERSON_LOG_WELCOME: "Rejoignez-nous pour gérer vos marque-pages selon vos envies !",
				BUTTON_LANG_EN: 'Anglais',
				BUTTON_LANG_FR: 'Français',
				PERSON_LOG_TITLE: 'Identifiez-vous et accédez à la liste de vos marque-pages',
				PERSON_LOG_MAIL: "Adresse email",
				PERSON_LOG_REQUIRED: "Ce champ est obligatoire",
				PERSON_LOG_VALID: "Merci d'indiquer une adresse e-mail valide",
				PERSON_LOG_PASS: "Mot de passe",
				PERSON_LOG_MESSAGE: "J'ai oublié mon mot de passe !",
				PERSON_LOG_NEW: "Vous n'avez pas encore de compte ? ",
				PERSON_LOG_CONNECT: "Je me connecte",				
				PERSON_LOG_LOGIN_ERROR: "Le login et/ou mot de passe est incorrect",
				PERSON_LOG_MINLENGTH: "Le mot de passe doit contenir au minimum 3 caract&egrave;res",
				PERSON_LOG_MAXLENGTH: "Le mot de passe doit contenir au maximum 20 caract&egrave;res",
				PERSON_LOG_WHO: "Qui sommes nous ?",
				PERSON_LOG_CONTACT: "Contactez-nous",
				PERSON_DETAIL_PROFILE: "Mettre à jour mon profil",
				ADD: "Ajouter",
				PROFILE: "Mon profil",				
				LOGOUT: "Déconnexion",
				CANCEL: "Annuler",
				DELETE: "Supprimer",
				UPDATE: "Modifier"
			});
			
			$translateProvider.preferredLanguage('en');
		});
		
/* <p>{{'TITLE' | translate}}</p>  ou  <p translate="TITLE"></p>  */
	
	
	angular
        .module('marcopolo')
		.controller('traductCtrl', function ($scope, $translate) {
			$scope.changeLanguage = function (key) {
				$translate.use(key);
			};
		});
        
    } // function

)();