var app = angular.module('app');

app.controller("loginCtrl", ['$scope', '$location', 'accountService', function($scope, $location, accountService){
    
    (function(){
        accountService.getLoggedUser().then(function(res){
            
        },function(err){
            
        });
    })();
    
    $scope.loginForm = {};
    $scope.isFormValid = false;
    $scope.login = function(){
        accountService.login($scope.loginForm.username, $scope.loginForm.password).then(function(res){
            if(res.status == 200){
                
                if(res.data != null && res.data != undefined && res.data){
                    $scope.$parent.user = res.data;
                    $location.path("/home");
                }
                
            }else{
                
            }
        }, function(err){
            console.log(err);
        });
    };
    
    $scope.$watchCollection('loginForm', function(n){
        $scope.isFormValid = !(n.$invalid || n.$pristine);
        
    });
    
}]);