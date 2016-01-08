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
        $scope.visible = true;

        $scope.login = function()
        {
            console.log("Login function called with: " + $scope.email + " " + $scope.password);
            AuthenticationService.login($scope.email,  $scope.password);
        }
    };
})();