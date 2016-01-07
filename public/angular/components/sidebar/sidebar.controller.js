/**
 * Created by Michal on 29/12/2015.
 */
(function ()
{
    'use strict';

    angular
      .module('app.sidebar.controllers')
      .controller('SidebarController', SidebarController)

    var tag = "SidebarController: ";
    function SidebarController($scope, $rootScope, $log, $location, AuthenticationService)
    {
        $scope.getClass = function (path) {
          if ($location.path().substr(0, path.length) === path) {
            return 'currently_selected';
          } else {
            return '';
          }
        };

        $log.log(tag + "created!");
        $scope.state = true;
        $scope.sidebarTitle = undefined;

        if(AuthenticationService.getCurrentUser() !== undefined)
        {
            $scope.sidebarTitle = AuthenticationService.getCurrentUser().firstName + " " + AuthenticationService.getCurrentUser().lastName;
        }

        $scope.goBack = function()
        {
            $location.path($rootScope.beforeDashboardUrl);
        };

        $rootScope.$on('user-authentication-state-change', function(event, isLoggedIn)
            {
                if (isLoggedIn)
                {
                    $scope.sidebarTitle = AuthenticationService.getCurrentUser().firstName + " " + AuthenticationService.getCurrentUser().lastName;
                }
            }
        );
    }

})();