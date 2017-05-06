﻿(function () {
    'use strict';

    var app = angular.module('MIPM', ['ngRoute', 'firebase', 'ngStorage', 'ngMaterial', 'ngMessages', 'ngMenuSidenav', 'md.data.table', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'angularMoment']);
    app.constant('firebaseUrl', 'https://vert-7c966.firebaseio.com/');

    app.run(function ($rootScope, $location, $sessionStorage, $timeout) {
        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.currentUrl = $location.path();
        });
    });

})();