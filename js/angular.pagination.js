;
(function(angular) {
    var myModule = angular.module("myModule", []);

    myModule.constant('pagerConfig', {
        visiblePageCount: 10,
        firstText: 'First',
        lastText: 'Last',
        prevText: 'Previous',
        nextText: 'Next',
        showIfOnePage: false,
        showFirstLastText: true,
        gotoText: 'goto',
        showGoto: false
    }).directive("pager", ['pagerConfig', function(pagerConfig) {
        return {
            link: function(scope, element, attrs) {
                var visiblePageCount = angular.isDefined(attrs.visiblePageCount) ? attrs.visiblePageCount : pagerConfig.visiblePageCount;
                scope.firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : pagerConfig.firstText;
                scope.lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : pagerConfig.lastText;
                scope.prevText = angular.isDefined(attrs.prevText) ? attrs.prevText : pagerConfig.prevText;
                scope.nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : pagerConfig.nextText;
                scope.showFirstLastText = angular.isDefined(attrs.showFirstLastText) ? attrs.showFirstLastText : pagerConfig.showFirstLastText;
                scope.showIfOnePage = angular.isDefined(attrs.showIfOnePage) ? attrs.showIfOnePage : pagerConfig.showIfOnePage;
                scope.gotoText = angular.isDefined(attrs.gotoText) ? attrs.gotoText : pagerConfig.gotoText;
                scope.showGoto = angular.isDefined(attrs.showGoto) ? attrs.showGoto : pagerConfig.showGoto;

                // sync with outer scope
                scope.currentPage = 1;

                scope.pageChange = function(page) {
                    if (page >= 1 && page <= scope.pageCount) {
                        scope.currentPage = page;
                    } else {
                        scope.currentPage = 1;
                    }
                }

                scope.keyupHanlder = function(e) {
                    var value = e.target.value;
                    var parsedValue = parseInt(value, 10);
                    if (!Number.isNaN(parsedValue)) {
                        if (parsedValue >= 1 && parsedValue <= scope.pageCount) {

                        } else if (parsedValue < 1) {
                            e.target.value = 1;
                        } else {
                            e.target.value = scope.pageCount;
                        }
                        if (e.keyCode === 13) {
                            // pressed enter
                            scope.currentPage = parsedValue;
                        }
                    } else {
                        if (e.preventDefault) {
                            e.preventDefault();
                        } else {
                            return false;
                        }
                    }
                }

                function build() {
                    var low,
                        high,
                        v;

                    scope.pagenums = [];

                    if (scope.pageCount === 0) {
                        return;
                    }
                    if (scope.currentPage > scope.pageCount) {
                        scope.currentPage = 1;
                    }

                    if (scope.pageCount <= visiblePageCount) {
                        low = 1;
                        high = scope.pageCount;
                    } else {
                        v = Math.ceil(visiblePageCount / 2);
                        low = Math.max(scope.currentPage - v, 1);
                        high = Math.min(low + visiblePageCount - 1, scope.pageCount);

                        if (scope.pageCount - high < v) {
                            low = high - visiblePageCount + 1;
                        }
                    }

                    for (; low <= high; low++) {
                        scope.pagenums.push(low);
                    }
                }

                scope.$watch('currentPage+pageCount', function() {
                    build();
                    scope.onPageChange();
                });
            },
            replace: true,
            restrict: "E",
            scope: {
                pageCount: '=',
                currentPage: '=',
                onPageChange: '&'
            },
            template: '<div class="pagination"><ul ng-if="pageCount>1 || showIfOnePage"><li ng-click="pageChange(1)" ng-if="showFirstLastText">{{firstText}}</li>' +
                '<li ng-click="pageChange(currentPage-1>0?currentPage-1:1)">{{prevText}}</li>' +
                '<li ng-repeat="pagenum in pagenums track by pagenum" ng-click="pageChange(pagenum)" ng-class="{active:currentPage===pagenum}">{{pagenum}}</li>' +
                '<li ng-click="pageChange(currentPage+1<=pageCount?currentPage+1:pageCount)">{{nextText}}</li>' +
                '<li ng-click="pageChange(pageCount)" ng-if="showFirstLastText">{{lastText}}</li></ul>' +
                '<lable ng-if="showGoto">{{gotoText}}<input type="text" ng-keyup="keyupHanlder($event)"></label></div>'
        }
    }]);
})(angular)
