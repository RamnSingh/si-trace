(function () {
    'use strict';

    var app = angular.module("app", ['ngRoute','ngResource']);
    
    app.config(function($routeProvider){
        
        $routeProvider.when('/login', {
            templateUrl : 'view/login.view.html',
            controller  : 'loginCtrl'
        }).when('/tickets', {
            templateUrl : 'view/tickets.view.html',
            controller  : 'ticketsCtrl'
        }).when('/ticket/:ticketId', {
            templateUrl : 'view/ticket.view.html',
            controller  : 'ticketCtrl'
        }).when('/addticket', {
            templateUrl : 'view/addTicket.view.html',
            controller  : 'addTicketCtrl'
        }).when('/newtickets', {
            templateUrl : 'view/newTickets.view.html',
            controller  : 'newTicketsCtrl'
        }).when('/addcomment/:ticketId', {
            templateUrl : 'view/addComment.view.html',
            controller  : 'addCommentCtrl'
        });
    });

    app.run(function($rootScope){
        $rootScope.getLabelClassForPriority = function(priority){

            if(priority == null || priority == undefined)
                return;

            priority = priority.toLowerCase();
            if(priority === "trivial"){
                return "label-success";
            }else if(priority === "minor"){
                return "label-primary";
            }else if(priority === "major"){
                return "label-info";
            }else if(priority === "critical"){
                return "label-warning";
            }else if(priority === "blocker"){
                return "label-danger";
            }
        }
    });
})();