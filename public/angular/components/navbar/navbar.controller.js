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
        $rootScope.isNavbarReady = true;
        $rootScope.isNavbarShowing = true;
        $scope.userLoggedIn = false;
        $scope.navbarTitle = "Not logged in";

        // Listen for user log in events.
        $rootScope.$on('authentication-complete', function(event, successful)
            {
                if (successful)
                {
                    $scope.userLoggedIn = true;
                }

                if($location.path().indexOf('dashboard') === -1)
                {
                    if(successful)
                        $scope.navbarTitle = AuthenticationService.getCurrentUser().firstName + " " + AuthenticationService.getCurrentUser().lastName;

                    $log.log("emitting navbar ready");
                    $rootScope.$emit('navbar-ready');
                    $rootScope.isNavbarReady = true;
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
                $rootScope.isLoggedIn = AuthenticationService.getCurrentUser() !== undefined;
                $rootScope.isNavbarReady = true;
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