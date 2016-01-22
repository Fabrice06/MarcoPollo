(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('personLogCtrl', personLogCtrl);

    personLogCtrl.$inject = ['$scope', '$resource', '$location'];
    function personLogCtrl($scope, $resource, $location) {

        $scope.onSubmit = function (pPersonLog) {

            var nPerson = $resource('persons/', {});
            var nResponseId = 0;
            //calls http://localhost:63342/static/persons?mail=MyMail&mdp=myMdp
            nPerson.query({mail:pPersonLog.mail, mdp:pPersonLog.mdp},
                function (response) {
                    console.log("réussite login.query " + JSON.stringify(response));

                    // pas trop bon car on ne check pas si plusieurs réponses (doublons issus du be)
                    // en cas de doublon, le be doit retourner une erreur
                    angular.forEach(response, function (item) {
                        if (item.id_person) {
                            nResponseId = item.id_person;
                        }
                    });

                    // remplace aprés le # dans la barre d'adresse
                    $location.path('/persons/' + nResponseId + '/marquepages').replace();

                    //User.save(
                    //    {id : currentUserInfo.currentUser.techId}, // Params
                    //    user, // Data
                    //    function (data, headers) { // OK
                    //        console.log(methodAndUrl.method + " OK");
                    //        var tmp = headers('Location');
                    //        var tabUrl = tmp.split("/");
                    //        var techId = tabUrl[tabUrl.length - 1];
                    //        console.log(" OK " + status + " user techId " + techId);
                    //        $location.path("/users/" + techId).replace();


                },
                // échec
                function (pData, headers) {
                    console.log("échec login.query");
                }
            );
        };

        $scope.confirmation = function(){
            alert('Un mot de passe provisoire a été envoyé à votre adresse e-mail');
        };

        $scope.envoyerMail = function(){

        };


    } // function

    //$scope.users = User.query();
    //$scope.validate(user) {
    //    user.$update();
    //}
    //$scope.delete(user) {
    //    user.$delete();
    //}
    //$scope.create(newUserName) {
    //    var user = new User();
    //    user.name = newUserName;
    //    user.$save();
    //    $scope.users.push(user);
    //}

})();