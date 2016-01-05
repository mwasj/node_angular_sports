/**
 * Created by Michal on 21/12/2015.
 */

(function () {
  'use strict';

  angular
    .module('app.config', [])
    .config(config);

  /**
  * @name config
  * @desc Enable HTML5 routing
  */
  function config($locationProvider, $httpProvider)
  {
      console.log("Function config called.")
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');
      $httpProvider.interceptors.push('InterceptorService');
  }
})();