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
        //状态转换
        .filter('statusSwitch', statusSwitch)
        //数字金额大写转换(可以处理整数,小数,负数)
        .filter('digitUppercase', digitUppercase);

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
                return 0
            }
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
                'singleDatepicker': '日期',
                'datepicker': '日期区间',
                'text': '单行输入框',
                'number': '数字输入框',
                'textarea': '多行输入框',
                'addPhotos': '图片',
                'addApprovers': '审批人',
                'addAttachments': '附件',
                'radio': '单选框',
                'checkbox': '多选框',
                'amount': '金额'
            }[str];
        }
    }

    /** 数字金额大写转换(可以处理整数,小数,负数) */
    function digitUppercase() {
        return function(n) {
            var fraction = ['角', '分'];
            var digit = [
                '零', '壹', '贰', '叁', '肆',
                '伍', '陆', '柒', '捌', '玖'
            ];
            var unit = [
                ['元', '万', '亿'],
                ['', '拾', '佰', '仟']
            ];
            // if (isNaN(parseFloat(n, 10))) return;
            // var reg = new RegExp(' /^[(-?\d+\.\d+)|(-?\d+)|(-?\.\d+)]+$/');
            // if (!reg.test(n)) return;
            //正则表达式验证是不是数字
            //if (! /[0-9]+/.test(n)) return; 这个正则表达式也可以
            if (! /^[(-?\d+\.\d+)|(-?\d+)|(-?\.\d+)]+$/.test(n)) return;
            var head = n < 0 ? '欠' : '';
            n = Math.abs(n);
            var s = '';
            for (var i = 0; i < fraction.length; i++) {
                s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
            }
            s = s || '整';
            n = Math.floor(n);
            for (var i = 0; i < unit[0].length && n > 0; i++) {
                var p = '';
                for (var j = 0; j < unit[1].length && n > 0; j++) {
                    p = digit[n % 10] + unit[1][j] + p;
                    n = Math.floor(n / 10);
                }
                s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
            }
            return head + s.replace(/(零.)*零元/, '元')
                .replace(/(零.)+/g, '零')
                .replace(/^整$/, '零元整');
        };
    }

})();
