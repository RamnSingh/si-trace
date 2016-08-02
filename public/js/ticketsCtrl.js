var app = angular.module('app');

app.controller("ticketsCtrl", ['$scope', '$location', 'accountService', 'ticketService', function($scope, $location, accountService, ticketService){
    
    $scope.tickets = [];

    (function(){
        accountService.getLoggedUser().then(function(res){
            if(res.data === undefined || res.data === null || res.data == false){
                $location.path('/login');
            }else{
                loadTickets();
            }
        })
    })();


    function loadTickets(){
        ticketService.getAll($scope.$parent.user._id).then(function(res){
            console.log(res);
            if(res.status == 200){
                $scope.tickets = res.data;
            }

        }, function(err){
            console.log(err);
        });
    }
}]);