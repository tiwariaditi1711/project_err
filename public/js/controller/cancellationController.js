
  'use strict';

module.exports = function($scope, $http,$rootScope, $location) {
  $scope.cancellation = 'cancellation';

  /* logic to cancel the movie ticket after booking*/
$scope.search_booked_movie=function(){
var m=$scope.cncl.booked_movie;
var t=$scope.cncl.booked_email;

  $http.get('/seats/selectTickets/'+m+'/'+t).success(function (response) {
$scope.getTicketData=response;
  });

}


$scope.deleteTicket=function(getTicketData){
  var x=confirm("Are you sure you want to delete tickets ?");
  if(x){
    $http.delete('/seats/deleteTicket/'+getTicketData._id).success(function (response) {
    });
  }

  };


};

