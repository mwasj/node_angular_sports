/**
 * Created by Michal on 21/12/2015.
 */
(function () {
  'use strict';


  angular
    .module('app.routes', [])
    .config(config)
    .run(function ($rootScope, $location, AuthenticationService) {

        console.log("Executing app.run");
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams)
        {
            AuthenticationService.isLoggedIn().then(function(isLoggedIn)
            {
                if(isLoggedIn && (toState.url === '/login' || toState.url === '/signup'))
                {
                    $location.path('/');
                    return;
                }

                if(!isLoggedIn && toState.authenticate)
                {
                    $rootScope.redirectAfterLogin = $location.path();
                    $rootScope.returnToState = toState.url;
                    $rootScope.returnToStateParams = toParams.Id;
                    $location.path('/login');
                }
            });
        });
     }
    );


  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($stateProvider, $urlRouterProvider)
  {
      console.log("Configuring routes.");
      $urlRouterProvider.when('/dashboard', '/dashboard/home');
      $urlRouterProvider.otherwise("/");

      $stateProvider
      .state('app', {
            abstract: true,
            controller: "IndexController",
            templateUrl: "/public/angular/components/index/index.html",
            views: {
                nav: {
                    controller: "NavbarController",
                    templateUrl: "/public/angular/components/navbar/navbar.html"
                }
            }
      })
      .state('app.index', {
            url: '/',
            views: {
                'content@': {
                    controller: "IndexController",
                    templateUrl: "/public/angular/components/index/index.html"
                }
            }
      })
      .state('app.login', {
            url: "/login",
            views: {
                'content@': {
                    controller: "LoginController",
                    templateUrl: "/public/angular/components/login/login.html"
                }
            }
        })
       .state('app.signup', {
            url: "/signup",
            controller: "SignupController",
            templateUrl: "/public/angular/components/signup/signup.html"
        })
        .state('dashboard', {
            url: "/dashboard",
            controller: "DashboardController",
            templateUrl: "/public/angular/components/dashboard/dashboard.html",
            authenticate: true,
            views: {
                content: {
                    controller: "DashboardController",
                    templateUrl: "/public/angular/components/dashboard/dashboard.html"
                }
            }
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
        })
        .state('dashboard.test2.detail', {
            url: "/:testId",
            templateUrl: "/public/angular/components/dashboard/components/test2/test2.html",
            controller: function($stateParams){
              $stateParams.testId  //*** Exists! ***//
            },
            authenticate: true
        });
  }
})();
