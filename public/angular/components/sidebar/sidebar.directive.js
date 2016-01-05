/**
 * Created by Michal on 03/01/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.sidebar.directives', [])
        .directive('SidebarDirective', function()
        {
            return {
                link : function(scope, element, attr) {
                    scope.$watch(attr.sidebarDirective, function(newVal) {
                          if(newVal)
                          {
                            element.addClass('show');
                            return;
                          }
                          element.removeClass('show');
                    });
                }
            };
    });
})();