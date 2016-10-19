(function() {
  'use strict';

  angular
    .module('lighter')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, $stateParams) {
    //将以下两个服务添加都根作用域方便使用
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
    $log.debug('runBlock end');
  }

})();
