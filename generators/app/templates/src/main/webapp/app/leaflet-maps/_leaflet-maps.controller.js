(function() {
    'use strict';

    angular
      .module('<%=angularAppName%>')
      .controller('LeafletMapsController', LeafletMapsController);

    LeafletMapsController.$inject = ['$scope', 'leafletData'];

    function LeafletMapsController($scope, leafletData) {

      angular.extend($scope, {
        center: {
          autoDiscover: true
        },
        overlays: {
          search: {
            name: 'search',
            type: 'group',
            visible: true,
            layerParams: {
              showOnSelector: false
            }
          }
        }
      });

      leafletData.getLayers().then(function(baselayers) {
        console.log(baselayers.overlays.search);
        angular.extend($scope.controls, {
          search: {
            layer: baselayers.overlays.search
          }
        });
      });

      leafletData.getMap().then(function(map) {
        map.addControl(new L.Control.Search({
          url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
          jsonpParam: 'json_callback',
          propertyName: 'display_name',
          propertyLoc: ['lat', 'lon'],
          circleLocation: false,
          markerLocation: false,
          autoType: false,
          autoCollapse: true,
          minLength: 2,
          zoom: 10
        }));
      });
    }
  })();
