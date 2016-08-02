var app = angular.module('app');
var apiBaseUrl = "http://localhost:3000/ticket";

app.factory('ticketService', function($http){
    
    var service = {};
    
    service.addTicket = function(ticket, userId){
        return $http.post(apiBaseUrl + '/add', {ticket : ticket, userId : userId});
    };

    service.get = function(ticketId){
        return $http.post(apiBaseUrl + '/one', {ticketId : ticketId});
    };

    service.getAll = function(){
        return $http.post(apiBaseUrl + '/all');
    };

    service.getAllTicketsWithNewStatus = function(){
        return $http.post(apiBaseUrl + '/newStatus');
    };

    service.changeStatus = function(ticketId, ownerId){
		return $http.post(apiBaseUrl + '/changeStatus', {ticketId : ticketId, ownerId : ownerId});
    }

    service.addComment = function(comment, ticketId, userId){
		return $http.post(apiBaseUrl + '/addComment', {comment : comment, ticketId : ticketId, userId : userId});
    }
    
    
    
    return service;
});