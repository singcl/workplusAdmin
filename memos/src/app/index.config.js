(function() {
    'use strict';

angular
    .module('lighter')
    .config(config);

    /** @ngInject */
    function config($logProvider) {
        // Enable log
        $logProvider.debugEnabled(true);
        /*//通过此配置使$location能获取url中?参数
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });*/

        //lazyLoad controller, directive, service
       
        // Set options third-party lib
        // We configure ocLazyLoad to use the lib script.js as the async loader     
    }

})();
