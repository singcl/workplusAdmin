/* global moment:false */
(function() {
  'use strict';

angular
    .module('lighter')
    .constant('WORKPLUS_CONFIG', {
        moment: moment,
        server: 'http://172.16.1.241:9999'
    });
})();
