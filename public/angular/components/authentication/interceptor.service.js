/**
 * Created by Michal on 29/12/2015.
 */
(function()
{
    'use strict';

    angular
        .module('app.authentication.services')
        .factory('InterceptorService', InterceptorService);

    function InterceptorService($q, $location, $injector) {
        var AuthenticationService;

        return {
            request: function (config) {
                return config || $q.when(config);
            },
            requestError: function (request) {
                return $q.reject(request);
            },
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (response) {
                if (response && response.status === 401) {
                    if (!AuthenticationService) {
                        AuthenticationService = $injector.get('AuthenticationService');
                    }

                    console.log("Interceptor received 401! " + $location.path());
                    AuthenticationService.sendLogoutSignal();
                }
                if (response && response.status >= 500) {
                    // Handle 500 response.
                }

                return $q.reject(response);
            }
        };
    }
})();