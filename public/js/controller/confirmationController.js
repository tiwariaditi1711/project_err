module.exports = function($scope, $http, $rootScope, $location){
	var confirmation = function(){
		$scope.mname = $rootScope.Moviename;
		$http.get('movie/getMovie').success(function(response){
			$scope.moviedata=response;
		});
	};
	confirmation();
};