(function() {
    /* body... */
    'use strict';

    angular
        .module('lighter')
        .controller('DragAndDropController', DragAndDropController);

    /** @ngInject */
    function DragAndDropController($scope, workplusAPIservice, $log, $timeout) {

        $scope.flag = {
            origin: false,
            saving: false,
            saved: false,
            error: false
        }

        $scope.models = {
            selected: null,
            name: "请假",
            intro: "请假模板",
            icon: "xxx",
            enable: true,
            templates: [
                [{
                    "type": "select",
                    "require": true,
                    "title": "请假类型",
                    "default": [
                        { "optionValue": "请选择" },
                        { "optionValue": "病假" },
                        { "optionValue": "病假" },
                        { "optionValue": "病假" },
                        { "optionValue": "病假" }
                    ],
                    "value": "请选择"
                }],
                [{
                    "type": "datepicker",
                    "require": true,
                    "title": "开始时间",
                    "value": "2016/08/22"
                }, {
                    "type": "datepicker",
                    "require": true,
                    "title": "结束时间",
                    "value": "2016/08/22"
                }],
                [{
                    "type": "text",
                    "require": true,
                    "title": "请假天数",
                    "default": "请输入请假天数",
                    "value": ""
                }],
                [{
                    "type": "textarea",
                    "require": true,
                    "title": "请假事由",
                    "default": "请输入请假事由",
                    "value": ""
                }],
                [{
                    "type": "add",
                    "require": false,
                    "title": "图片",
                    "default": {
                        "href": "",
                        "hrefText": "添加图",
                        "spanText": "（最多选择9张"

                    }
                }, {
                    "type": "add",
                    "require": false,
                    "title": "审批人",
                    "default": {
                        "href": "",
                        "hrefText": "添加审批人",
                        "spanText": ""
                    }
                }]
            ],
            dropzones: {
                'A': []
            }
        };

        $scope.defaultType = function(val) {
            if (angular.isArray(val)) {
                return true;
            }
        }

        $scope.$watch('models.dropzones.A', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

        $scope.createTemplate = function() {
            $scope.flag.origin = true;
            $scope.flag.saving = true;

            var data = {};
            data.name = $scope.models.name;
            data.intro = $scope.models.intro;
            data.icon = $scope.models.icon;
            data.enable = $scope.models.enable;
            data.controls = $scope.models.dropzones.A;
            workplusAPIservice.createTpl(data).success(function(res) {
                var promise1 = $timeout(function() {
                    $scope.flag.saving = false;
                    $scope.flag.saved = true;
                }, 1000);
                promise1.then(function() {
                    var promise2 = $timeout(function() {
                        $scope.flag.saved = false;
                        $scope.flag.origin = false;
                    }, 1000);
                    promise2.then(function() {
                        $log.log('当前返回：' + angular.toJson(res, true));
                    })
                })
            })

            .error(function() {
                var promise3 = $timeout(function() {
                    $scope.flag.saving = false;
                    $scope.flag.error = true;
                }, 1000);
                promise3.then(function() {
                    $timeout(function() {
                        $scope.flag.error = false;
                        $scope.flag.origin = false;
                    }, 1000);
                })
            })
        }
    }
})();
