(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('Hateoas', Hateoas);

    Hateoas.$inject = ['$location'];
    function Hateoas($location) {
        var nLinks = {};

        return {
            getUri: function (pKey) {
                return nLinks[pKey];
            },

            //getSignedUri: function (pKey) {
            //
            //    // préparation de la requête à usage unique du type
            //    // nUri = /persons/1/marquepages?user=3626810c003760d1c278a356c450af9abe695ce9&timestamp=12341523&signature=3626810c003760d1c278a356c450
            //
            //    var nUri = nLinks[pKey] + Session.getStamp();
            //    var nSignature = Crypto.HmacSHA1(nUri, Session.getMdp());
            //    nUri = nUri + "&signature=" + nSignature;
            //
            //    console.log("Hateoas factory getSignedUri " + nUri);
            //    return nUri;
            //},

            setLinks: function (pLinks) {
                for	(var index = 0; index < pLinks.length; index++) {

                    var nUrl = pLinks[index].href;
                    // remplace aprés le # dans la barre d'adresse
                    var nPort = $location.port(nUrl);
                    var nPathArray = nUrl.split(nPort);

                    nLinks[pLinks[index].rel] = nPathArray[1];
                } // for
            }
        }
    } // function

})();