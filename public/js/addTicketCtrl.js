var app = angular.module('app');

app.controller("addTicketCtrl", ['$scope', '$location', 'accountService', 'ticketService', function($scope, $location, accountService, ticketService){
    
    $scope.ticket = {};
    $scope.isFormValid = false;
    (function(){
        accountService.getLoggedUser().then(function(res){
            if(res.data === undefined || res.data === null || res.data == false){
                $location.path('/login');
            }  
        })
    })();


    $scope.addTicket = function(){
    	ticketService.addTicket($scope.ticket, $scope.$parent.user._id).then(function(res){
    		
    		if(res.status == 200 && res.data){
    			$location.path('/tickets');
    		}else{
    			alert("Error while inserting data");
    		}

    	}, function(err){
    		console.log(err);
    	});
    }
    
    $scope.$watchCollection('ticketForm', function(n){
    	$scope.isFormValid = !(n.$invalid || n.$pristine);
    });
}]);