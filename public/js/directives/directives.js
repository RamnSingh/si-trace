var app = angular.module('app')
.directive('tooltip', function(){
	return{
		restrict : 'A',
		scope : {
			tooltip : "@"
		},
		link : function(scope, elem, attrs){

			if(scope.tooltip == null || scope.tooltip == undefined || scope.tooltip.toString().trim() === ""){
				scope.tooltip = "user didn\'t provide his or her firstname and lastname";
			}
			elem.prop("title", scope.tooltip);
			elem.tooltip();
		}
	}
});