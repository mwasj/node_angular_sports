/**
 * Created by Michal on 07/01/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.navbar.services')
        .factory('NavbarService', NavbarService);

    var tag = "Navbar Service: ";
    function NavbarService($scope, $rootScope, AuthenticationService) {
        $log.log(tag + "created!");

        return {};
    }
})();