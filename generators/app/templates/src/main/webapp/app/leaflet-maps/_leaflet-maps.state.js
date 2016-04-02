(function() {
  'use strict';

  angular
    .module('<%=angularAppName%>')
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    $stateProvider.state('entity-audit', {
      parent: 'app',
      url: '/leaflet-maps',
      data: {
        authorities: [],
        pageTitle: 'Leaflet maps'
      },
      views: {
        'content@': {
          templateUrl: 'app/leaflet-maps/leaflet-maps.html',
          controller: 'LeafletMapsController',
          controllerAs: 'vm'
        }
      },
      resolve: {}
    });
  }
})();
