/**
 * Created by Michal on 29/12/2015.
 */
/**
* SignupController
*/
(function () {
    'use strict';

   angular
        .module('app.signup.controllers')
        .controller('SignupController', SignupController);

    var tag = "LoginController: ";
    /**
    * @namespace SignupController
    */
    function SignupController($scope, AuthenticationService, $rootScope, $log, $location)
    {
        $log.log(tag + "created!");
        $scope.visible = $rootScope.isNavbarReady;
        $scope.email = undefined;
        $scope.password = undefined;
        $scope.firstName = undefined;
        $scope.lastName = undefined;

        $rootScope.$on('navbar-ready', function()
        {
            console.log("navbar ready received");
            $scope.visible = true;
        });

        $rootScope.$on('user-authentication-state-change', function(event, isLoggedIn)
        {
            if(isLoggedIn)
            {
                $location.path('/dashboard');
            }
        });

        $scope.signup = function()
        {
            AuthenticationService.signup($scope.email,  $scope.password, $scope.firstName, $scope.lastName);
        }

        $rootScope.$emit('navbar-show');
    }
})();