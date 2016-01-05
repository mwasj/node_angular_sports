/**
 * Created by Michal on 28/12/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.authentication.services')
        .factory('AuthenticationService', AuthenticationService);

    var tag = "Authentication Service: ";
    function AuthenticationService($http, $location, $rootScope, $log, $q)
    {
        $log.log(tag + "created!");
        var currentUser = undefined;
        $log.log(tag + "attempting to authenticate the current session.");
        /*$http.get('/isloggedin').then(authSuccessFn, authErrorFn);

        //Authentication successful
        function authSuccessFn(data, status, headers, config)
        {
            currentUser = data.data.user;
            $log.log(tag + "session successfully authenticated, saving currently logged in user.");
            $rootScope.$emit('user-logged-in');
            $rootScope.$emit('authentication-complete', true);
            $rootScope.$broadcast('authentication-complete', true);
        }

        //Authentication failed.
        function authErrorFn(data, status, headers, config)
        {
            $log.log(tag + "session failed to authenticate.");
            $rootScope.$emit('authentication-complete', false);
            $rootScope.$broadcast('authentication-complete', false);
        }*/

        return {
            login: login,
            logout: logout,
            signup: signup,
            test: test,
            getCurrentUser: getCurrentUser,
            isLoggedIn: isLoggedIn,
            subscribe: subscribe,
            sendLogoutSignal: sendLogoutSignal
        };

        function login(email, password)
        {
            return $http.post('/login', {email:email, password:password}
                ).then(loginSuccessFn, loginErrorFn);

                //Authentication successful
                function loginSuccessFn(data, status, headers, config)
                {
                    console.log(data.data.user);
                    currentUser = data.data.user;
                    $location.path('/dashboard/home');
                    $rootScope.$emit('authentication-complete', true);
                }
                //Authentication failed.
                function loginErrorFn(data, status, headers, config)
                {
                    console.log(data.data.message);
                    $rootScope.$emit('authentication-complete', false);
                }
        }

        function signup(email, password, firstName, lastName)
        {
            return $http.post('/signup', {email:email, password:password, firstName: firstName, lastName: lastName}
                ).then(signupSuccessFn, signupErrorFn);

                //Signup successful
                function signupSuccessFn(data, status, headers, config)
                {
                    console.log(data.data.user);
                    console.log(data);
                }
                //Signup failed.
                function signupErrorFn(data, status, headers, config) {
                    console.log(data.data.message);
                }
        }

        function logout()
        {
            currentUser = undefined;
            return  $http.get('/logout').then(logoutSuccessFn, logoutSuccessFn);

            //Logout successful
            function logoutSuccessFn(data, status, headers, config)
            {
                $log.log(tag + "user successfully logged out.");
                currentUser = undefined;
                window.location = '/';
            }
        }

        function getCurrentUser()
        {
            var user = undefined;

            if(currentUser !== undefined)
            {
                user = {
                    firstName: currentUser.local.firstName,
                    lastName: currentUser.local.lastName
                };
            }
            return user;
        }

        function isLoggedIn()
        {
            if(currentUser === undefined)
            {
                console.log("CALLING SERVER FOR USER");
                return $http.get('/isloggedin').then(function(data, status, headers, config)
                {
                    currentUser = data.data.user;
                    $log.log(tag + "session successfully authenticated, saving currently logged in user.");
                    return true;
                    $rootScope.$emit('user-logged-in');
                    $rootScope.$emit('authentication-complete', true);
                    $rootScope.$broadcast('authentication-complete', true);
                }, function(data, status, headers, config)
            {
                currentUser = undefined;
                return false;
            });
            }
            else{
                console.log("RETURNING CACHED USER");
                return $q.when(true);
            }

        }

        function test()
        {
            return $http.get('/api/test').then(loginSuccessFn, loginErrorFn);

                //Authentication successful
                function loginSuccessFn(data, status, headers, config)
                {
                    console.log("Authentication successful");
                }
                //Authentication failed.
                function loginErrorFn(data, status, headers, config) {
                    console.log("Authentication failure");
                }
        }

        function subscribe(scope, callback)
        {
            var handler = $rootScope.$on('notifying-service-event', callback);
            scope.$on('$destroy', handler);
        }

        function sendLogoutSignal()
        {
            console.log("Logout signal received! Beginning to emit logout signal to controllers.");
            $rootScope.$emit('notifying-service-event');
        }
    }

})();