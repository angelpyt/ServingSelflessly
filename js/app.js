// Create app
var myApp = angular.module('myApp', ['ui.router','firebase'])
// Configure app
myApp.config(function($stateProvider) {
    $stateProvider
    .state('home', {
        url:'',
        templateUrl: 'templates/home.html',
        controller: 'HomeController',
    })
    .state('map', {
        url:'/map',
        templateUrl: 'templates/map.html',
        controller: 'MapController'
    })
    .state('forum', {
        url:'/forum',
        templateUrl: 'templates/forum.html',
        controller: 'ForumController'     
    })
    .state('about', {
        url:'/about',
        templateUrl: 'templates/about.html',
        controller: 'AboutController'     
    })
    // .state('user', {
    //     url:'/user',
    //     templateUrl: 'templates/user.html',
    //     controller: 'UserController'     
    // })
})

    // Home page controller
    .controller('HomeController', function($scope){
        $(document).ready(function(){
            var slider = $("#slider").mostSlider({
                aniMethod: 'auto',
                animation: 'slide',
            });
        });
    })

    // Map page controller
    .controller('MapController', function($scope, $http){
        // $http.get('data/about.json').success(function(response) {
        // $scope.mapData = response;
        // )

        var map = L.map('map').setView([40, -100], 5);
        var layer = L.tileLayer('https://api.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGlzYWxseSIsImEiOiJjaWZzZWs2M3oxOWw2b2VrcnRobzh4OGRiIn0.fkN85EVGVV_JCobEVLwrJQ');
        layer.addTo(map)

        buildMap($scope.mapData, map)

        var buildMap = function(data, map) {
            // build map function heres
        }
        
    })

    // Forum page controller
    .controller('ForumController', function($scope){
        $scope.url = "http://www.quicksprout.com/images/foggygoldengatebridge.jpg"
    })

    // About page controller
    .controller('AboutController', function($scope, $http, $firebaseArray){
        $http.get('data/about.json').success(function(response) {
        $scope.aboutData = response;
        console.log($scope.aboutData)
        })

        // Contact box
        var ref = new Firebase("https://ss-contact-app.firebaseio.com/");
        var contactsRef = ref.child('contacts')

        $scope.contacts = $firebaseArray(contactsRef)

        $scope.submit = function() {
            $scope.contacts.$add({
                name: $scope.name,
                email: $scope.email,
                subject: $scope.subject,
                message: $scope.message,
                time: Firebase.ServerValue.TIMESTAMP
            })

            .then(function() {
                $scope.name = "";
                $scope.email = "";
                $scope.subject = "";
                $scope.message = "";
                $scope.contacts.$save();
                alert("Thanks for leaving a message, one of our creators will contact you as soon as possible");
            })
        }    

    })

    // .controller('UserController', function($scope){
    //   $scope.url = "http://www.quicksprout.com/images/foggygoldengatebridge.jpg"
    // })


