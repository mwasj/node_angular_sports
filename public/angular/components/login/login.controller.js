/**
 * Created by Michal on 23/12/2015.
 */
/**
* LoginController
*/
(function () {
    'use strict';

   angular
        .module('app.login.controllers')
        .controller('LoginController', LoginController);

    var tag = "LoginController: ";
    /**
    * @namespace LoginController
    */
    function LoginController($scope, AuthenticationService, $rootScope, $log, $location)
    {
        $log.log(tag + "created!");
        $scope.email = undefined;
        $scope.password = undefined;
        $scope.visible = $rootScope.isNavbarReady;

        $rootScope.$on('navbar-ready', function()
        {
            console.log("navbar ready received");
            $scope.visible = true;
        });

        $rootScope.$on('authentication-complete', function(event, successful)
        {
            $log.log(tag + "signal received");
            if(successful)
            {
                $location.path('/dashboard');
            }
        });

        $scope.login = function()
        {
            console.log("Login function called with: " + $scope.email + " " + $scope.password);
            AuthenticationService.login($scope.email,  $scope.password);
        }

        $scope.testAuthentication = function()
        {
            console.log("Testing authentication");
            AuthenticationService.test();
        }

        $rootScope.$emit('navbar-show');
    };
})();