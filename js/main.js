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
        day: '01/12/2017', 
        format: 'DD/MM/YYYY'
    };
    const MAY  = '05';
    
    let days, hours, min, seconds, percent;
    let momentMay = moment(MAY  , 'MM');
    let momentCurrent = moment();

    function setCurrentMoment() {
        momentCurrent = moment();
    }

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
        $scope.values[0]['days'] =  interval._data.days + ' Days';
        $scope.values[0]['hours'] =  interval._data.hours  + ' hours';
        $scope.values[0]['min'] =  interval._data.minutes + ' minutes'; 
        $scope.values[0]['seconds'] =  interval._data.seconds  + ' seconds';
        $scope.values[0]['percent'] =  getPercentCountDown();
    }

    function changedValuesBySelector(){
        $("#inDivBar").attr("aria-valuenow", $scope.values[0]['percent']);
        $("#inDivBar").css("width", $scope.values[0]['percent'] + '%');
        $("#labelBar").text($scope.values[0]['percent'].toFixed(4) + '%');
    }

    function applyChanged(){
        setCurrentMoment();
        setValues(getMilisecondsInterval());
        changedValuesBySelector();
        changedInterval();
        $scope.$apply();
    }

    function changedInterval() {
        setInterval(function () {
            applyChanged();
        }, 1000);
    }
    changedInterval();
});
