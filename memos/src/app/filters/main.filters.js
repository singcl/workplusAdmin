(function() {
    'use strict';

    angular
        .module('lighter')
        //paging用来对前端数据进行分页
        .filter('paging', paging)
        //size用来在页面中获取过滤后的数组长度
        .filter('size', size)
        //orderClass用来生成排序图标
        .filter('orderClass', orderClass)
        //格式化显示时间
        .filter('formatDate', formatDate)
        //内容转换
        .filter('statusSwitch', statusSwitch);

    /** @ngInject */
    function paging() {
        return function(items, index, pageSize) {
            if (!items)
                return [];

            var offset = (index - 1) * pageSize;
            return items.slice(offset, offset + pageSize);
        }
    }

    function size() {
        return function(items) {
            if (!items) {
                return 0 }
            return items.length || 0;
        }
    }

    function orderClass() {
        return function(direction) {
            if (direction === -1)
                return "glyphicon-chevron-down";
            else
                return "glyphicon-chevron-up";
        }
    }

    function formatDate(moment) {
        return function(date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        };
    }

    function statusSwitch() {
        return function(str) {
            return {
                'PROCESSING': '审批中...',
                'COMPLETED': '完成',
                'select': '下拉列表',
                'datepicker': '日期区间',
                'text': '单行输入框',
                'textarea': '多行输入框',
                'add': '图片和审批人'
            }[str];
        }
    }
})();
