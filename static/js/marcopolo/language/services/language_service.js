(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('Language', Language);

    Language.$inject = ['$http', 'Session'];
    function Language ($http, Session) {

        var dataFactory = {};

        //// création de la signature de l'uri
        //// pour préparer la requête à usage unique du type
        //// nUri = /persons/1/marquepages?user=3626810c003760d1c278a356c450af9abe695ce9&timestamp=12341523&signature=3626810c003760d1c278a356c450
        //var getSignature = function (pUrl, pParams, pTimestamp) {
        //
        //    var nUri = pUrl + "?user=" + Session.getMail() + "&timestamp=" + pTimestamp;
        //
        //    if (pParams.length >= 1) {
        //        // convert it into html form data by using $.param (jQuery function)
        //        nUri = nUri + "&" + $.param(pParams);
        //    } // if
        //
        //    var nSignature = Crypto.HmacSHA1(nUri, Session.getMdp());
        //
        //    console.log("Language factory query getSignature uri " + nUri + "&signature=" + nSignature);
        //
        //    return nSignature;
        //};


        dataFactory.query = function (pUrl, pParams) {

            var nTimestamp = Date.now();
            var nSignature = Session.getSignature(pUrl, pParams, nTimestamp);

            var nReq = {
                method: 'GET',
                url: pUrl,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                params: {
                    // requête à usage unique
                    //signature: nSignature,
                    //timestamp: nTimestamp,
                    //user: Session.getMail()

                    //params supplémentaires

                } // params
            };
            return $http(nReq);
        };

        return dataFactory;

    } // function

})();