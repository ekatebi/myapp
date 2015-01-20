/**
 * Created by ekatebi on 1/1/15.
 */
var myApp = angular.module('routerApp');

myApp.controller('homeCtrl', ['$scope', '$log', '$location', '$state',
    function($scope, $log, $location, $state) {

        $scope.greeting = 'Hola!';

        $log.log('homeCtrl: ' + $location.path());

        $log.log('homeCtrl: ' + $state.$current.name);

        //$state.go('about');
}]);

