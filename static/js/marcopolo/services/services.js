'use strict';

var myServices = angular.module('marcopolo.Services', ['ngResource']);

myServices.factory('PersonService', function ($resource) {
			return $resource('resources/persons', {}, {
				'get': {method:'GET', isArray: false }
			});
		});