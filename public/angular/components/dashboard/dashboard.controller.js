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
    function DashboardController($scope, $rootScope, $log, $location)
    {
        $log.log(tag + "created!");
        $rootScope.$emit('navbar-hide');
        $scope.visible = true;

        $rootScope.$on('navbar-ready', function()
        {
            console.log(tag + "navbar ready received");

        });

        $rootScope.$on('authentication-complete', function(event, successful)
            {
                $log.log(tag + "signal received");
                if (!successful)
                {
                    $location.path('/');
                }
            }
        );
    };

})();