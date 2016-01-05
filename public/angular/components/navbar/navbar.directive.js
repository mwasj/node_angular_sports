/**
 * Created by Michal on 01/01/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.navbar.directives')
        .directive('tree', function() {
          return {
            restrict: "E",
            replace: true,
            scope: {
              tree: '='
            },
            templateUrl: '/public/angular/components/navbar/template-ul.html'
          };
        })
        .directive('leaf', function($compile)
        {
            return {
                restrict: "E",
                replace: true,
                scope: {
                leaf: "="
            },
            templateUrl: '/public/angular/components/navbar/template-li.html',
                link: function(scope, element, attrs)
                {
                    if (angular.isArray(scope.leaf.subtree))
                    {
                        element.append("<tree tree='leaf.subtree'></tree>");
                        element.addClass('dropdown-submenu');
                        $compile(element.contents())(scope);
                    }
                    else
                    {
                        element.bind('click', function ()
                        {
                            alert("You have clicked on " + scope.leaf.name);
                        });

                    }
                }
            }
        });
})();