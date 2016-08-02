var app = angular.module('app');
var baseUrl = "http://localhost:3000";
app.factory('accountService', function($http){
    
    var service = {};
    
    service.getLoggedUser = function(){
        return $http.get(baseUrl + '/loggeduser');
    };
    
    service.login = function(username, password){
        
        return $http.post(baseUrl + '/login', {username : username, password : password});
    };
    
    service.logout = function(){
        
        return $http.post(baseUrl + '/logout');
    };
    
    return service;
});