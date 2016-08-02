var app = angular.module('app');

app.controller("addCommentCtrl", ['$scope', '$location', '$routeParams', 'accountService', 'ticketService', function($scope, $location, $routeParams, accountService, ticketService){
    
    $scope.comment = {};
    $scope.ticket = {};
    $scope.isFormValid = false;
    (function(){
        accountService.getLoggedUser().then(function(res){
            if(res.data === undefined || res.data === null || res.data == false){
                $location.path('/login');
            }else{
                $scope.ticketId = $routeParams.ticketId;
                getTicket();
            }
        })
    })();

    function getTicket(){
        ticketService.get($scope.ticketId).then(function(res){
            console.log(res);
            if(res.status == 200){
                $scope.ticket = res.data;
            }

        }, function(err){
            console.log(err);
        });
    }

    $scope.addComment = function(){
        ticketService.addComment($scope.comment, $scope.ticketId, $scope.$parent.user._id).then(function(res){
            console.log(res);
            if(res.status == 200){
                $scope.ticket = res.data;
            }

        }, function(err){
            console.log(err);
        });
    }

    $scope.$watchCollection('commentForm', function(n){
        $scope.isFormValid = !(n.$invalid || n.$pristine);
    });
    
}]);