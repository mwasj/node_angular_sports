/**
 * Created by Michal on 01/01/2016.
 */
(function () {
    'use strict';

   angular
        .module('app.navbar.controllers')
        .controller('NavbarController', NavbarController);

    var tag = "NavbarController: ";
    /**
    * @namespace NavbarController
    */
    function NavbarController($scope, AuthenticationService, $log, $rootScope, $location)
    {
        $log.log(tag + "created!");
        $rootScope.navbarEnabled = false;
        $rootScope.navbarDataReady = false;
        $rootScope.isNavbarShowing = true;
        $scope.userLoggedIn = false;
        $scope.navbarTitle = "Not logged in";

        // Listen for user log in events.
        $rootScope.$on('user-authentication-state-change', function(event, isLoggedIn)
            {
                $scope.navbarTitle = isLoggedIn ? AuthenticationService.getCurrentUser().firstName + " " + AuthenticationService.getCurrentUser().lastName : "Not logged in";

                if($location.path().indexOf('dashboard') === -1)
                {
                    $rootScope.$emit('navbar-ready');
                    $rootScope.navbarEnabled = true;
                    $rootScope.navbarDataReady = true;
                    $rootScope.isNavbarShowing = true;
                }
            }
        );

        $rootScope.$on('navbar-hide', function()
        {
            $rootScope.isNavbarShowing = false;
        });

        $rootScope.$on('navbar-show', function()
        {
            if(!$rootScope.isNavbarShowing)
            {
                $rootScope.navbarDataReady = true;
                $rootScope.isNavbarShowing = true;
                $rootScope.$emit('navbar-ready');
            }


        });

        $scope.logout = function()
        {
            AuthenticationService.logout();
        };

         $scope.tree = [
             {
                name: "Menu Item 1",
                link: "#",
                subtree: [
                    {
                        name: "Menu Subitem 1",
                        link: "#"
                    }
                ]
            }, {
            name: "Menu Item 2",
            link: "#",
            subtree: [{
              name: "Menu Subitem 2",
              link: "#"
            }]
          }, {
            name: "divider",
            link: "#"
          }, {
            name: "Menu Item 3",
            link: "#"
          }, {
            name: "divider",
            link: "#"
          },{
            name: "Menu Item 4",
            link: "#"
          }];
    }
})();