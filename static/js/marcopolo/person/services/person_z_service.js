(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('PersonZ', PersonZ);

    PersonZ.$inject = ['$http'];
    function PersonZ ($http) {

        var dataFactory = {};

        //dataFactory.getCustomers = function () {
        //    return $http.get(urlBase);
        //};
        //
        //dataFactory.getCustomer = function (id) {
        //    return $http.get(urlBase + '/' + id);
        //};

        dataFactory.save = function (pUrl, pParams) {
            var nReq = {
                method: 'POST',
                url: pUrl,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                params: {
                    mail: pParams.mail,
                    mdp: pParams.mdp,
                    langue: pParams.langue
                }
            };
            return $http(nReq);
        };

        dataFactory.query = function (pUrl, pParams) {
            var nReq = {
                method: 'GET',
                url: pUrl,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                params: {
                    mail: pParams.mail,
                    mdp: pParams.mdp
                }
            };
            return $http(nReq);
        };

        //dataFactory.updateCustomer = function (cust) {
        //    return $http.put(urlBase + '/' + cust.ID, cust)
        //};
        //
        //dataFactory.deleteCustomer = function (id) {
        //    return $http.delete(urlBase + '/' + id);
        //};
        //
        //dataFactory.getOrders = function (id) {
        //    return $http.get(urlBase + '/' + id + '/orders');
        //};

        return dataFactory;

    } // function

})();