(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('Language', Language);

    Language.$inject = ['$http', 'Session'];
    function Language ($http, Session) {

        var dataFactory = {};

        dataFactory.query = function (pUrl, pParams) {

            var nTimestamp = Date.now();
            var nSignature = Session.getSignature(pUrl, pParams, nTimestamp);

            var nReq = {
                method: 'GET',
                url: pUrl,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                params: {
                    // requête à usage unique
                    user: Session.getId(),
                    timestamp: nTimestamp,
                    signature: nSignature

                } // params
            };
            return $http(nReq);
        };

        return dataFactory;

    } // function

})();