/**
 * Created by Michal on 21/12/2015.
 */
(function() {
    'use strict';

    angular
        .module('app',[
            'ui.router',
            'app.config',
            'app.routes',
            'app.authentication',
            'app.index',
            'app.login',
            'app.signup',
            'app.dashboard',
            'app.dashboard.home',
            'app.sidebar',
            'app.navbar',
            'ui.bootstrap',
            'angularSpinner',
            'ngAnimate'
        ]);
})();