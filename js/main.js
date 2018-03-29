var app = angular.module('website', [
    'ngRoute'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "templates/home.html", controller: "BackToBeerController" })
        .when("/about", { templateUrl: "templates/about.html", controller: "AboutController" })
        .when('/404', { templateUrl: "templates/404.html" })
        .otherwise("/404");
}]);


app.controller('BackToBeerController', function ($scope, $location) {
    
    $scope.values = [{
        days: "",
        hours: "",
        min: "",
        seconds: "",
        percent: ""
    }];

    const START_DAY_COUNT = {
        day: '28/03/2018',
        format: 'DD/MM/YYYY'
    };
    const MAY  = '05';
    
    let days, hours, min, seconds, percent;
    let momentCurrent = moment();
    let momentMay = moment(MAY, 'MM');
    
    function getMilisecondsInterval() {
        return moment.duration(momentMay-momentCurrent, 'milliseconds');
    }

    function getPercentCountDown() {
        let momentStart = moment(START_DAY_COUNT.day, START_DAY_COUNT.format);
        let startSecondsDiff = momentMay.diff(momentStart, 'seconds');
        let currentSecondsDiff = momentMay.diff(momentCurrent, 'seconds');
        return 100 - ((currentSecondsDiff*100)/startSecondsDiff);
    }

    function setValues(interval) {
        $scope.values[0]['days'] =  Math.floor(interval.asDays());
        $scope.values[0]['hours'] =  Math.floor(interval.asHours() % 24);
        $scope.values[0]['min'] =  Math.floor(interval.asMinutes() % 60); 
        $scope.values[0]['seconds'] =  Math.floor(interval.asSeconds() % 60);
        $scope.values[0]['percent'] =  getPercentCountDown();
    }

    function changedValuesBySelector(){
        $("#inDivBar").attr("aria-valuenow", $scope.values[0]['percent']);
        $("#inDivBar").css("width", $scope.values[0]['percent'] + '%');
        $("#labelBar").text($scope.values[0]['percent'].toFixed(5) + '%');

        $("#dayscounter").find('p').text($scope.values[0]['days'] + ' Days');
        $("#hourscounter").find('p').text($scope.values[0]['hours'] + ' Hours');
        $("#mincounter").find('p').text($scope.values[0]['min'] + ' Minutes');
        $("#secondscounter").find('p').text($scope.values[0]['seconds'] + ' Seconds');
    }

    function changedInterval() {

        setValues(getMilisecondsInterval());
        changedValuesBySelector();

        setInterval(function () {
            changedInterval();
        }, 1000);
    }
    changedInterval();
});
