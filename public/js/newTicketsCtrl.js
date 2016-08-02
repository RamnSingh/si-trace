var app = angular.module('app');
app.controller("newTicketsCtrl", ['$scope', '$location', 'accountService', 'ticketService', function($scope, $location, accountService, ticketService){
    
    $scope.newTickets = [];
    
    (function(){
        accountService.getLoggedUser().then(function(res){
            if(res.data === undefined || res.data === null || res.data == false){
                $location.path('/login');
            }else{
                ticketService.getAllTicketsWithNewStatus().then(function(res){
                    if(res.status == 200){
                        $scope.newTickets = res.data;
                    }

                }, function(err){
                    console.log(err);
                });
            }
            
        })
    })();
    
}]);