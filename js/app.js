// Create app
var myApp = angular.module('myApp', ['ui.router','firebase'])
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

    .controller('MapController', function($scope, $http){
      var map = L.map('map').setView([51.505, -0.09], 13);
    })

    .controller('ForumController', function($scope){
      $scope.url = "http://www.quicksprout.com/images/foggygoldengatebridge.jpg"
    })

    .controller('AboutController', function($scope, $http, $firebaseArray){
      // $http.get('data/about.json').success(function(response) {
      //   $scope.about = response;
      //   console.log($scope.about)
      // })

        var ref = new Firebase("https://sscontactapp.firebaseio.com/");
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
                alert("Thanks for leaving a message, our staff will contact you ASAP");
            })
        }    

    })


