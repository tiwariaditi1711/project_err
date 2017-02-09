'use strict';

module.exports = function($scope, $http, $rootScope, $location) {
  $scope.booking = 'booking';

  var refresh = function () {
        $http.get('/movie/getMovie').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.moviList = response;
            $scope.movi = "";
        });
    };

    refresh();

    $scope.addMovie = function (movi) {
          $http.get('http://www.omdbapi.com/?t='+$scope.movi.moviTitle+'&y='+$scope.movi.moviYear+'&plot=short&r=json').success(function (response) {
                            console.log(response);
                            var movieObj={};
                            for(var key in response){
                                if(key=='Title' || key=='Year' || key== 'Language' || key== 'Poster' || key== 'Genre' || key== 'Director' || key== 'Actors'){
                                    movieObj[key] = response[key];
                                     
                                }
                            }
                           
                           var serviceName = 'movi'  
                            $http.post('/movie/addMovie', movieObj).success(function (response) {
                                console.log(response);
                                console.log("CREATE IS SUCCESSFUL");
                                refresh();
                            });
                           
                        });
        console.log($scope.contact);
       
    };



    $scope.removeMovie = function (movie) {
        //console.log(id);
        $http.delete('/movie/deleteMovie/' + movie._id).success(function (response) { 
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    /*$scope.editMovie = function (movie) {
         $http.get('/movie/getMovie/' + movie._id).success(function (response) {
            $scope.movi = response[0];
        });
    };*/

    $scope.updatemovie = function () {
        console.log("REACHED UPDATE");
        console.log($scope.movi._id);
        $http.put('/movie/updatemovie/' + $scope.movi._id, $scope.movi).success(function (response) {
            console.log(response);
            refresh();
        })
    }

/* code for rating controller*/

  $scope.rate = 7;
  $scope.max = 10;
  $scope.isReadonly = false;

  /*$scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 10 * (value / $scope.max);
  };*/

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];

/* star insertion code into database*/
  $scope.insertRatingValue=function(movie,r){
  $rootScope.movie_name=movie;
  var b=$rootScope.movie_name;
      $http.get('/movie/ratingDisplay').success(function (response) {
      console.log(response);
      $scope.ratingList=response;
    });

  $http.post('/movie/ratinginsert/'+b+'/'+r).success(function(response){
});
  };


};

