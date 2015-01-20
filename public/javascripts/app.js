/**
 * Created by ekatebi on 12/30/14.
 */
// app.js
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'tmpls/html/home.html',
            controller: 'homeCtrl'
        })
        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'tmpls/html/partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })

        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'tmpls/html/contact.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'tmpls/html/about.html'
        })
        .state('demos', {
            url: '/demos',
            templateUrl: 'tmpls/html/demos.html'
        })

});
