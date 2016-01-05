/**
 * Created by Michal on 03/01/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.dashboard.home.controllers')
        .controller('DashboardHomeController', DashboardHomeController)

    var tag = "DashboardHomeController: ";
    /**
    * @namespace DashboardHomeController
    */
    function DashboardHomeController($scope, $rootScope, $log, $location, AuthenticationService)
    {
        $log.log(tag + "created!");
    };

})();