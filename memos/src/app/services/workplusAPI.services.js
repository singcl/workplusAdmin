(function() {
    'use strict';

    angular
        .module('lighter')
        .factory('workplusAPIservice', workplusAPIservice);

    /** @ngInject */
    function workplusAPIservice($http, $log, WORKPLUS_CONFIG) {
        var workplusAPI = {};

        workplusAPI.getClickPage = function(params) {
            var path = '/approvals';
            params = params || {
                page: 0,
                size: 10,
                query: ''
            };
            //用定义好的格式化函数来展示请求连接
            $log.info('当前GET请求：' + '\n' + WORKPLUS_CONFIG.server + '/approvals?' + formatParams(params) + '\n' +
                '当前GET参数：' + angular.toJson(params, true));
            return $http({
                method: 'GET',
                url: path,
                params: params
            });
        }

        workplusAPI.authorizeLogin = function(data) {
            var path = '/login';
            data = data || {};
            $log.info('当前POST请求为：' + '\n' + WORKPLUS_CONFIG.server + '/login' + '\n' +
                '当前POST参数为：' + angular.toJson(data, true));
            return $http({
                method: 'POST',
                url: path,
                data: data
            });
        }

        workplusAPI.createTpl = function(data) {
            var path = '/templates';
            data = data || {};
            $log.info('当前POST请求为：' + '\n' + WORKPLUS_CONFIG.server + '/templates' + '\n' +
                '当前POST参数为：' + angular.toJson(data, true));
            return $http({
                method: 'POST',
                url: path,
                data: data
            });
        }


        /* workplusAPI.getTopicDtails = function(id) {
             var path = 'https://cnodejs.org/api/v1/topic/' + id;
             return $http({
                 method: 'GET',
                 url: path,
                 params: {
                     mdrender: false,
                     accessToken: 'lighter'
                 }
             });
         }

         workplusAPI.newTopics = function() {
             var path = 'https://cnodejs.org/api/v1/topics';
             return $http({
                 method: 'POST',
                 url: path,
                 data: {
                     accessToken: 'lighter',
                     title: 'mylit',
                     tab: 'share',
                     content: '我就是测试一下而已！lighter'
                 }
             });
         }*/

        //函数声明data格式化函数
        function formatParams(data) {
            var arr = [];
            for (var key in data) {
                //下面对象寻址中必须使用[]来寻址，不能用.来寻址 参考
                //百度或收藏夹（重学JS） 两种寻址的不同
                arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
            }
            //在请求中加入v=xxx的字符串形式来拒绝缓存，每次都直接从服务器加载
            arr.push("v=" + Math.random().toString().replace(".", ""));
            return arr.join("&");
        }

        return workplusAPI;
    }

})();