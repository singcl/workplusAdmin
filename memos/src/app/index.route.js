(function() {
    'use strict';

    angular
        .module('lighter')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

    $stateProvider

        /*//access
        .state('access', {
            url: '/access',
            template: '<div ui-view class="fade-in-right-big smooth"></div>'
        })

        .state('access.login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'login'
        })*/
        
        //Authorization
        .state('authorization', {
            url: '/',
            templateUrl: 'app/authorization/authorization.html',
            controller: 'AuthorizationController',
            controllerAs: 'authorization'
        })

        .state('main', {
            url: '/main',
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        })

        .state('dragAndDrop', {
            url: '/dragAndDrop',
            templateUrl: 'app/drag_and_drop/drag_and_drop.html',
            controller: 'DragAndDropController',
            controllerAs: 'dragAndDrop'
        })
    }

})();
