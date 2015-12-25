'use strict';

angular.module('<%=angularAppName%>')
    .config(function ($stateProvider) {
        $stateProvider
            .state('leaflet-maps', {
                parent: 'site',
                url: '/leaflet-maps',
                data: {
                    authorities: [],
                    pageTitle: 'Leaflet maps'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/leaflet-maps/leaflet-maps.html',
                        controller: 'LeafletMapsController'
                    }
                }
            });
    });
