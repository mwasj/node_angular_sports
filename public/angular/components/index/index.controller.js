/**
 * Created by Michal on 23/12/2015.
 */
/**
* IndexController
*/
(function () {
    'use strict';

    angular
        .module('app.index.controllers')
        .controller('IndexController', IndexController)

    var tag = "IndexController: ";
    /**
    * @namespace IndexController
    */
    function IndexController($scope, $rootScope, $log, $location, AuthenticationService)
    {
        $log.log(tag + "created!");
        $scope.visible = true;
    }

})();