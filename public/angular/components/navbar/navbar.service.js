/**
 * Created by Michal on 07/01/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.navbar.services')
        .factory('NavbarService', NavbarService);

    var tag = "NavbarService: ";
    function NavbarService($rootScope, $log)
    {
        $log.log(tag + "created!");
        var isVisible;

        return {
            hideNavbar: function()
            {
                isVisible = false;
            },
            isVisible: function()
            {
                return isVisible;
            }
        };
    }
})();