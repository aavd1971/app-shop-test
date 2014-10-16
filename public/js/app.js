"use strict";
var app = angular.module('app',['ngAnimate','ngResource','ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when('/about',{
        templateUrl: 'template/about.html',
        controller: 'AboutCtrl'
    })
        .when('/contacts',{
            templateUrl: 'template/contacts.html',
            controller: 'ContactsCtrl'
        })
        .when('/basket',{
            templateUrl: 'template/basket.html',
            controller: 'BasketCtrl'
        })
        .otherwise({redirectTo: '/basket'})
});
