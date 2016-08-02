var app = angular.module('app');
app.controller("indexCtrl", ['$scope', '$location', 'accountService', function($scope, $location, accountService){
    
    $scope.user = null;
    (function(){
        accountService.getLoggedUser().then(function(res){
            if(res.data === undefined || res.data === null || res.data == false){
                $location.path('/login');
            }else{
                $scope.user = res.data;
            }
        })
    })();
    
    $scope.logout = function(){
        accountService.logout().then(function(res){
            $scope.user = null;
            $location.path('/login');
        });
    }
    
}]);