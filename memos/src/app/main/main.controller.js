(function() {
    'use strict';

angular
    .module('lighter')
    .controller('MainController', MainController);

    /** @ngInject */
    function MainController(workplusAPIservice, $log, $window) {
        //vm is short for view model
        var vm = this;

        //数据排序
        vm.sort = {
            column: 'createTime',
            direction: -1,
            toggle: function(column) {
                if (column.sortable === false) return;

                if (vm.sort.column === column.name) {
                    vm.sort.direction = -vm.sort.direction || -1;
                } else {
                    vm.sort.column = column.name;
                    vm.sort.direction = -1;
                }
            }
        };

        // 构建表头模拟数据
        vm.columns = [
            {
                label: '标题',
                name: 'title',
                type: 'string'
            },
            {
                label: '内容摘要',
                name: 'identifier',
                type: 'string',
                sortable: false
            },
            {
                label: '发起时间',
                name: 'createTime',
                type: 'string'
            },
            {
                label: '审批人',
                name: 'approver',
                type: 'string'
            },
            {
                label: '状态',
                name: 'status',
                type: 'string'
            }
        ];

        //数据获取和查询基本设置
        vm.flag = false;
        vm.searchFlag = false;
        vm.isClicked = false;
        vm.noResult = false;
        vm.pages = {
            page: 0,
            size: 10
        };

        vm.pager = {
            previousPage: function() {
                // vm.flag = true;
                // if(!vm.pages.page) {
                //     $window.alert('当前已是第一页！')
                //     return;
                // }
                vm.pages.page--;
                displayPage()
                $log.log('当前flag值：' + vm.flag);
            },
            nextPage: function() {
                // if(!vm.flag) {
                //     $window.alert('当前已是最后一页！')
                //     return;
                // }
                vm.pages.page++;
                displayPage();
                $log.log('当前flag值：' + vm.flag);
            }
        };

        //数据搜索过滤
        vm.search = {
            //点击事件的搜索方法
            searchMethod: function() {
                vm.isClicked = true;
                vm.searchFlag = true;
                vm.noResult = false;
                vm.flag = false;
                vm.pages.page = 0;
                $log.log('正在搜索中！');
                //promise对象的异步请求
                workplusAPIservice.getClickPage(vm.pages).success(function(response) {
                    if (!angular.isArray(response.result)) {
                        vm.searchFlag = false;
                        vm.noResult = true;
                        $log.warn('警告：未授权用户！');
                        return;
                    }
                    var length = response.result.length;
                    vm.flag = {true: false, false: true}[length < vm.pages.size];
                    // vm.flag = (length < vm.pages.size) ? false : true;
                    vm.items = response.result;
                    $log.log('搜索完成！')
                    vm.searchFlag = false;
                    if(!length) {vm.noResult = true}
                })
                .error(function(response, status) {
                    vm.searchFlag = false;
                    $window.alert('链接服务器失败：' + response + '\n' + '状态码(status)：' + status);
                })
            },
            //键盘Enter触发当前焦点元素的搜索事件
            enterSearch: function($event) {
                if ($event.keyCode == 13) {
                    vm.search.searchMethod();
                }
            }
        }
        
        //分页函数及数据初始化函数
        function displayPage() {
            //for-in迭代，过滤掉对象中的query字段,保证在未点击查询之前搜索框中输入的字段不会影响翻页结果。
            var noQuery = {};
            for(var key in vm.pages) {
                if (key ==='query') continue;
                noQuery[key] = vm.pages[key];
            }

            var params = (vm.isClicked) ? vm.pages : noQuery;
            workplusAPIservice.getClickPage(params).success(function(response) {
                // $log.log('当前返回：' + angular.toJson(response, true));
                if (!angular.isArray(response.result)) {
                    $log.warn('警告：未授权用户！');
                    return;
                }
                var length = response.result.length;
                vm.flag = (length < vm.pages.size) ? false : true;
                vm.items = response.result;
            })
            .error(function(response, status) {
                $log.log('链接服务器失败信息：' + response + '\n' + '状态码(status)：' + status);
            })
        }
        //初始化载入数据
        displayPage();
    }

})();
