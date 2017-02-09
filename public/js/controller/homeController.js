'use strict';

module.exports = function($scope, $http, $rootScope, $location) {
  $scope.home = 'home';
 
 var refresh = function () {
        $http.get('/movie/getMovie').success(function (response) {
            console.log(response);
            $scope.moviList = response;
            
        });
    };

    refresh();


    var refresh1 = function () {
        $http.get('/theatre/getTheatre').success(function (response) {
            console.log(response);
            $scope.theatreList = response;
            $scope.theatre = "";
        });
    };

    refresh1();


    var refresh_mapping = function () {
        $http.get('/mapping/getMapping').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.mappingList = response;
            //$scope.mappingList = "";
        });

    };

    refresh_mapping();

$scope.nextPage=function(m,x){
$rootScope.Moviename=m;
$rootScope.MyPoster=x;
$location.path('/showTiming');
};


     $(function() {
            $( "#datepicker-1" ).datepicker();
         });

};


