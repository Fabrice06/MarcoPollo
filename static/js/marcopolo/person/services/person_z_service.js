(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('PersonZ', PersonZ);

    PersonZ.$inject = ['$http', 'Session'];
    function PersonZ ($http, Session) {

        var dataFactory = {};

        dataFactory.save = function (pUrl, pParams, pDatas) {

            // définition de la requête à usage unique
            var nTimestamp = Date.now();
            var nSignature = Session.getSignature(pUrl, pDatas, nTimestamp);

            var nReq = {
                method: 'POST',
                url: pUrl,
                headers: {'Content-Type': 'application/json'},
                params: {
                    // requête à usage unique
                    timestamp: nTimestamp,
                    user: pParams.user,
                    signature: nSignature
                }, // params

                data: pDatas
            };
            return $http(nReq);
        };


        dataFactory.query = function (pUrl, pParams) {

            // définition de la requête à usage unique
            var nTimestamp = Date.now();
            var nSignature = Session.getSignature(pUrl, pParams, nTimestamp);

            var nReq = {
                method: 'GET',
                url: pUrl,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                params: {
                    // requête à usage unique
                    signature: nSignature,
                    timestamp: nTimestamp,
                    user: pParams.user,

                    //params supplémentaires
                    // attention: l'ordre des params doit être le même que dans l'uri
                    mail: pParams.mail,
                    mdp: pParams.mdp
                }
            };
            return $http(nReq);
        };


        dataFactory.delete = function (pUrl, pParams) {

            // définition de la requête à usage unique
            var nTimestamp = Date.now();
            var nSignature = Session.getSignature(pUrl, pParams, nTimestamp);

            var nReq = {
                method: 'DELETE',
                url: pUrl,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                params: {
                    // requête à usage unique
                    signature: nSignature,
                    timestamp: nTimestamp,
                    user: pParams.user
                }
            };
            return $http(nReq);
        };


        dataFactory.update = function (pUrl, pParams, pDatas) {

            // définition de la requête à usage unique
            var nTimestamp = Date.now();
            var nSignature = Session.getSignature(pUrl, pDatas, nTimestamp);

            console.log("person factory params " + JSON.stringify(pParams));

            var nReq = {
                method: 'PUT',
                url: pUrl,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                params: {
                    // requête à usage unique
                    signature: nSignature,
                    timestamp: nTimestamp,
                    user: pParams.user

                    //params supplémentaires
                    // attention: l'ordre des params doit être le même que dans l'uri
                    //mail: pParams.mail,
                    //langue: pParams.langue
                },
                data: pDatas
            };
            return $http(nReq);
        };

        return dataFactory;

    } // function

})();