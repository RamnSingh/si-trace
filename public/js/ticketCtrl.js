var app = angular.module('app');

app.controller("ticketCtrl", ['$scope', '$location', '$routeParams', 'accountService', 'ticketService', function($scope, $location, $routeParams, accountService, ticketService){
    
    $scope.ticket = {};

    (function(){
        accountService.getLoggedUser().then(function(res){
            if(res.data === undefined || res.data === null || res.data == false){
                $location.path('/login');
            }else{
                $scope.ticketId = $routeParams.ticketId;
                loadTicket();
            }
        })
    })();


    function loadTicket(){
        ticketService.get($scope.ticketId).then(function(res){
            console.log(res);
            if(res.status == 200){
                $scope.ticket = res.data;
            }

        }, function(err){
            console.log(err);
        });
    }

    $scope.changeStatus = function(){
        ticketService.changeStatus($scope.ticketId, $scope.$parent.user._id).then(function(res){
            if(res.status == 200 && res.data){
                $scope.ticket.status = $scope.ticket.status === "New" ? "In progress" : "Done";
            }
        }, function(err){
            console.log(err);
        });
    }

}]);