/**
 * Created by Michal on 21/12/2015.
 */
(function () {
  'use strict';


  angular
    .module('app.routes', [])
    .config(config)
     .run(function ($rootScope, $location, AuthenticationService) {
      // Redirect to login if route requires auth and you're not logged in
          $rootScope.$on('$stateChangeStart', function (event, toState, toParams)
          {
              console.log("Is user logged in? " + AuthenticationService.isLoggedIn().then(function(result) {
                  console.log("Result: " + result); // 'abc'
              }));
              console.log("ROUTE STATE START CHANGE");
          })
     });


  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($stateProvider, $urlRouterProvider)
  {
      $urlRouterProvider.when('/dashboard', '/dashboard/home');
      $urlRouterProvider.otherwise("/");

       $stateProvider.state('home', {
            url: "/",
            controller: "IndexController",
            templateUrl: "/public/angular/components/index/index.html"
        })
        .state('login', {
            url: "/login",
            controller: "LoginController",
            templateUrl: "/public/angular/components/login/login.html"
        })
       .state('signup', {
            url: "/signup",
            controller: "SignupController",
            templateUrl: "/public/angular/components/signup/signup.html"
        })
        .state('dashboard', {
            url: "/dashboard",
            controller: "DashboardController",
            templateUrl: "/public/angular/components/dashboard/dashboard.html",
            authenticate: true
        })
        .state('dashboard.home', {
            url: "/home",
            controller: "DashboardHomeController",
            templateUrl: "/public/angular/components/dashboard/components/home/home.html",
            authenticate: true
        })
        .state('dashboard.test1', {
            url: "/test1",
            templateUrl: "/public/angular/components/dashboard/components/test1/test1.html",
            authenticate: true
        })
        .state('dashboard.test2', {
            url: "/test2",
            templateUrl: "/public/angular/components/dashboard/components/test2/test2.html",
            authenticate: true
        });


      /*$routeProvider.when('/signup', {
                controller: 'SignupController',
                templateUrl: '/public/angular/components/signup/signup.html'
            }).when('/login', {
                controller: 'LoginController',
                templateUrl: '/public/angular/components/login/login.html'
            }).when('/dashboard', {
                controller: 'DashboardController',
                controllerAs: 'vm',
                templateUrl: '/public/angular/components/dashboard/dashboard.html'
            }).when('/', {
                controller: 'IndexController',
                controllerAs: 'vm',
                templateUrl: '/public/angular/components/index/index.html'
      });*/
  }
})();
