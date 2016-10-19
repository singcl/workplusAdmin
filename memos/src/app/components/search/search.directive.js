(function() {
  'use strict';

  angular
    .module('lighter')
    .directive('lighterSearch', lighterSearch);

  /** @ngInject */
  function lighterSearch() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/search/search.html'
    };

    return directive;

    /** @ngInject */
    
  }

})();
