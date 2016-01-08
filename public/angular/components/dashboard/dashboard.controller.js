/**
 * Created by Michal on 23/12/2015.
 */
/**
* DashboardController
*/
(function () {
    'use strict';

    angular
        .module('app.dashboard.controllers')
        .controller('DashboardController', DashboardController)

    var tag = "DashboardController: ";
    /**
    * @namespace DashboardController
    */
    function DashboardController($scope, $rootScope, $log, $location, AuthenticationService, NavbarService)
    {
        $log.log(tag + "created!");
        $rootScope.$emit('navbar-hide');
        $scope.visible = true;

        $rootScope.$on('user-authentication-state-change', function(event, isLoggedIn)
            {
                if (!isLoggedIn)
                {
                    $location.path('/');
                }
            }
        );
    };

})();