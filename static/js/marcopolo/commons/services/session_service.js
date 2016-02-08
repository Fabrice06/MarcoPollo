(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('Session', Session);

    function Session() {
        var nSession = {};

        return {
            setMail: function (pMail) {
                nSession['mail'] = pMail;
            },
            getMail: function () {
                return nSession['mail'];
            },
            setMdp: function (pMdp) {
                nSession['mdp'] = pMdp;
            },
            getMdp: function () {
                return nSession['mdp'];
            },
            getStamp: function () {
                var nStamp = "?user=" + nSession['mail'] + "&timestamp=" + Date.now();
                return nStamp;
            },
            //setSalt: function (pSalt) {
            //    nSession['salt'] = pSalt;
            //},
            //getSalt: function () {
            //    return nSession['salt'];
            //},
            clear: function () {
                nSession['mail'] = "";
                nSession['mdp'] = "";
                //nSession['salt'] = "";
            }
        }
    } // function

})();