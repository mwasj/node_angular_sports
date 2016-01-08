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
      console.log("Configuring interceptors & HTML5 routing.");
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');
      $httpProvider.interceptors.push('InterceptorService');
  }
})();