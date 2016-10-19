(function() {
    'use strict';

angular
    .module('lighter')
    .controller('AuthorizationController', AuthorizationController);

    /** @ngInject */
    function AuthorizationController($log, $state, $window, workplusAPIservice) {
        var vm = this;

        //自定义函数获取url参数
        function getRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        vm.originObj = getRequest();
        vm.request = {
            'from': 'PC',
            'userId': vm.originObj.user_id,
            'name': '熊二代123456789123456789012345',
            'avatar': 'xxxx',
            'orgId': vm.originObj.org_id,
            'ticket': vm.originObj.ticket
        };

        workplusAPIservice.authorizeLogin(vm.request)
        .success(function(resp) {
            $log.log('当前返回值：' + angular.toJson(resp, true));
            //可以用switch语句代替
            if(resp.status == 0 && resp.result === 'ok') {
                $state.go('main');
            } else if(resp.status == 1) {
                $window.alert('登陆失败！');
            } else if(resp.status == 2) {
                $window.alert('授权失败！');
            }else {
                $log.log('未知错误！'); 
            }
        })

        .error(function(resp) {
            $window.alert('Error:server error' + '\n' + resp)
        })
    }  
})();
