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
        return {
            login: login,
            logout: logout,
            signup: signup,
            getCurrentUser: getCurrentUser,
            isLoggedIn: isLoggedIn,
            sendLogoutSignal: sendLogoutSignal
        };

        function login(email, password)
        {
            return $http.post('/login', {email:email, password:password}
                ).then(loginSuccessFn, loginErrorFn);

                //Authentication successful
                function loginSuccessFn(data, status, headers, config)
                {
                    currentUser = data.data.user;
                    $location.path(($rootScope.redirectAfterLogin !== undefined) ? $rootScope.redirectAfterLogin : "/");
                    $rootScope.$emit('user-authentication-state-change', true);
                }
                //Authentication failed.
                function loginErrorFn(data, status, headers, config)
                {
                    console.log(data.data.message);
                    $rootScope.$emit('user-authentication-state-change', false);
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
            return  $http.get('/logout').then(function(data, status, headers, config)
            {
                currentUser = undefined;
                $rootScope.$emit('user-authentication-state-change', false);
                $location.path("/");
            });
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
                $log.log(tag + " user data not found, asking server to authenticate.");
                return $http.get('/isloggedin').then(
                    function(data, status, headers, config)
                    {
                        currentUser = data.data.user;
                        $log.log(tag + "session authentication successful. Welcome user " + currentUser.email);
                        return true;
                    },
                    function(data, status, headers, config)
                    {
                        $log.log(tag + "session authentication failed.");
                        $rootScope.$broadcast('user-authentication-state-change', false);
                        currentUser = undefined;
                        return false;
                    });
            }
            else{
                return $q.when(true);
            }
        }

        function sendLogoutSignal()
        {
            console.log("Logout signal received! Beginning to emit logout signal to controllers.");
        }
    }

})();