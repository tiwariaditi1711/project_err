module.exports = function($scope, $http,$rootScope, $location){

$scope.insertMovie =function(){
//$rootScope.amount=$scope.data.seatAmt;
$location.path('/booking');
};

$scope.insertTheatre =function(){
//$rootScope.amount=$scope.data.seatAmt;
$location.path('/theatre');
};

$scope.mapTheatreMovie =function(){
//$rootScope.amount=$scope.data.seatAmt;
$location.path('/mapping');
};
};
