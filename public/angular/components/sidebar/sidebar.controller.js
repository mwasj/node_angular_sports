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

        $scope.toggleState = function()
        {
            $scope.state = $scope.state;
        }

        $rootScope.$on('authentication-complete', function(event, successful)
            {
                if (successful)
                {
                    $scope.sidebarTitle = AuthenticationService.getCurrentUser().firstName + " " + AuthenticationService.getCurrentUser().lastName;
                }
            }
        );
    }

})();