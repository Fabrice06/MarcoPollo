(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('Hateoas', Hateoas);

    function Hateoas() {
        var nLinks = {};

        return {
            getUri: function (pKey) {
                return nLinks[pKey];
            },
            set: function (pLinks) {
                for	(var index = 0; index < pLinks.length; index++) {
                    nLinks[pLinks[index].rel] = pLinks[index].href;
                } // for
            }
        }
    } // function

})();