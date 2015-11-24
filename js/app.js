// Create app
var myApp = angular.module('myApp', ['ui.router'])
// Configure app
myApp.config(function($stateProvider) {
    $stateProvider
    .state('home', {
        url:'/home',
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
})

// Home page controller: define $scope.number as a number
    .controller('HomeController', function($scope){
        $(document).ready(function(){
            var slider = $("#slider").mostSlider({
                aniMethod: 'auto',
                animation: 'slide',
            });
        });
    })


// Projects page controller: define $scope.about as a string
    .controller('MapController', function($scope, $http){
      var map = L.map('map').setView([51.505, -0.09], 13);
    })

// Contact controller: define $scope.url as an image
    .controller('ForumController', function($scope){
      $scope.url = "http://www.quicksprout.com/images/foggygoldengatebridge.jpg"
    })

// About controller: define $scope.url as an image
    .controller('AboutController', function($scope, $http){
      // $http.get('data/about.json').success(function(response) {
      //   $scope.about = response;
      //   console.log($scope.about)
      // })
    })


