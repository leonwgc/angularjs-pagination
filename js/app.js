var app = angular.module('app', ['myModule']);

app.controller('myCtrl', function($scope, $http, $log) {
    $scope.onPageChange = function() {
        $log.log($scope.currentPage);
    };

    $scope.pageCount = 100;
});
