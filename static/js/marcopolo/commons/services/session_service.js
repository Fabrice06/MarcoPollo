(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('Session', Session);

    Session.$inject = [ 'Crypto'];
    function Session(Crypto) {
        var nSession = {};

        return {
            setCurrent: function (pMail, pMdp) {
                nSession['mail'] = pMail;
                nSession['mdp'] = pMdp;
            },
            getSignedUri: function (pUri) {

                // préparation de la requête à usage unique du type
                // nUri = /persons/1/marquepages?user=3626810c003760d1c278a356c450af9abe695ce9&timestamp=12341523&signature=3626810c003760d1c278a356c450

                var nUri = pUri + "?user=" + nSession['mail'] + "&timestamp=" + Date.now();
                nSession['signature'] = Crypto.HmacSHA1(nUri, nSession['mdp']);
                nUri = nUri + "&signature=" + nSession['signature'];

                console.log("Session factory getSignedUri " + nUri);
                return nUri;
            },
            setMail: function (pMail) {
                nSession['mail'] = pMail;
            },
            //getMail: function () {
            //    return nSession['mail'];
            //},
            //setMdp: function (pMdp) {
            //    nSession['mdp'] = pMdp;
            //},
            //getMdp: function () {
            //    return nSession['mdp'];
            //},
            //getStamp: function () {
            //    var nStamp = "?session=" + nSession['mail'] + "&timestamp=" + Date.now();
            //    return nStamp;
            //},

            clear: function () {
                nSession['mail'] = "";
                nSession['mdp'] = "";
                nSession['signature'] = "";
            }
        }
    } // function

})();