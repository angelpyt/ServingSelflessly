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
    .state('user', {
        url:'/user',
        templateUrl: 'templates/user.html',
        controller: 'UserController'     
    })
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
        // if there is a current user then the signup should turn to logout
        if (currentUser != null) {
            // $("#signupButton").text("Logout");
            $("#account-form").attr("action", "");
        }

        //Rating 
        // $('#rating').raty();
        Parse.initialize("WQe7zzFFG3JYkV9BP6f6Hu6T4q2uSYD9jffBLHcp", "y9hajTS7877LR6ByHV7kqlQ8US1MiSvjIhVO2esd");

        var Review = Parse.Object.extend('Review');

        var currentUser = Parse.User.current();

        if(currentUser) {
            $("#signupButton").text("Hello, "+currentUser.get('username'));
            $("#logoutButton").show();
        } else {
            $("#logoutButton").hide();
        }

        //click event when write is submitted
        $('#write').submit(function() {
            if (currentUser != null) {
                var review = new Review();  
                var title = $('#title');
                review.set('title', title.val());
                var content = $('#content');
                review.set('content', content.val());
                var date = new Date();
                review.set('date', date.toDateString());
                review.set('votes', 0);
                review.set('helpful', 0);
                review.set('user', Parse.User.current());

                if (title.val().trim() == "" || content.val().trim == "") {
                    alert("You must include a title and review content!");
                    return false;
                } 



                review.save(null, {
                    success:function() {
                        title.val('');
                        content.val('');
                        $('#rating').raty({score: 0});
                        getData();
                    }
                })
            } else {
                alert("Sign in to review");
            }
            return false;
        })

        //write a function to get data
        var getData = function() {
            var query = new Parse.Query(Review);
            query.include("user");
            query.find({
                success:function(results) {
                    buildList(results);
                } 
            })
        }

        // a function to build the list
        var buildList = function(data) {
            var rating = 0;

            $('#reviewArea').empty();
            data.forEach(function(d){
                rating += d.get('rating');
                addItem(d);
            })
            $("#avgRating").raty({score:rating/(data.length), readOnly: true});
        }

        //this function takes in an item, adds it to the sreen
        var addItem = function(item) {
            //console.log('addItem', item);
            var title = item.get('title');
            var content = item.get('content');
            var rating = item.get('rating');
            var date = item.get('date');
            var votes = item.get('votes');
            var helpful = item.get('helpful');
            var user = item.get('user');

            //var li = $('<li>check' + title + 'out' + content + '</li>');
            //var li = $('<li></li>');
            var div = $('<div class = "well"></div>');
            var Title = $('<div id = "T"></div>');
            Title.text(title);
            var Content = $('<div id = "C"></div>');
            Content.text(content);
            var D = $('<div id = "Date"></div>');
            D.text(" Created on " + date + " by " + currentUser.get('username')); 
            var Rate = $('<div id = "R"></div>');
            Rate.raty({score: rating, readOnly: true});
            var Helpful = $('<div id = "H"></div>');

            var voteUp = $("<button class='voting'><span class='glyphicon glyphicon-thumbs-up'></span></button>");
            var voteDown = $("<button class='voting'><span class='glyphicon glyphicon-thumbs-down'></span></button>");
            var button = $('<button id="button" class="btn-warning btn-xs"><span class="glyphicon glyphicon-remove"></span></button>');

            button.click(function() {
                if (currentUser.id == user.id) {
                    item.destroy({
                        success:getData
                    })
                }
            })

            voteUp.on("click", function() {
                item.set("helpful", helpful +=1);
                item.set("votes", votes += 1);
                item.save();
                getData();
            });

            voteDown.on("click", function() {
                item.set("votes", votes += 1);
                item.save();
                getData();

            });

            if (votes != 0) {
                Helpful.text(helpful + " out of " + votes + " found this review helpful.");
            }

            // div.append(Rate);
            div.append(Title);
            div.append(button);
            div.append(voteDown);
            div.append(voteUp);
            div.append(D);
            div.append(Content);
            div.append(Helpful);

            $('#reviewArea').append(div);
        }

        getData();

    })

    // About page controller
    .controller('AboutController', function($scope, $http, $firebaseArray){
        $http.get('data/about.json').success(function(response) {
        $scope.aboutData = response;
        console.log($scope.aboutData)
        });

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

    .controller('UserController', function($scope){

        Parse.initialize("WQe7zzFFG3JYkV9BP6f6Hu6T4q2uSYD9jffBLHcp", "y9hajTS7877LR6ByHV7kqlQ8US1MiSvjIhVO2esd");

        $(document).ready(function(){
            $("#relocate-login").click(function(){
                console.log("signup");
                $("#signin").show();
                $("#signup").hide();
            });
            $("#relocate-create").click(function(){
                console.log("signin");
                $("#signin").hide();
                $("#signup").show();
            });

        });

        Parse.User.logOut();


        //log user out
        $("#out").on("click", function() {
            if (currentUser != null) {
                Parse.User.logOut();
                location.reload();
                alert("You have successfully logged out");
            }
        })

        // user signup form
        $("#signup-form").submit(function() {
            if ($("#new-username").val() == "" && $("#new-password").val() == "") {
                alert("Cannot signup an empty account!");
            } else {
                var user = new Parse.User();
                user.set("username", $("#new-username").val());
                user.set("password", $("#new-password").val());
                user.set("reviews", [])

                user.signUp(null, {
                  success: function(user) {
                    Parse.User.logIn($("#new-username").val(), $("#new-password").val(), {
                      success: function(user) {
                        document.location.href = "index.html";
                      },
                      error: function(error) {
                        var para = document.createElement("p");
                        var text = document.createTextNode(error.message);
                        para.appendChild(node);
                        clearInput();
                      }
                    });
                  },
                  error: function(user, error) {
                    alert("Error: " + error.message);
                    clearInput();
                  }
                });
            }
            return false;
        });

        // user sign in form
        $("#signin-form").submit(function() {
            Parse.User.logIn($("#username").val(), $("#password").val(), {
                success: function(user) {
                    document.location.href = "index.html";
                },
                error: function(error) {
                    console.log("Error: " + error.message);
                    clearInput();   
                }   
            });

            return false;
        });

        // clears all input fields
        var clearInput = function() {
            $("#new-username").val("");
            $("#new-password").val("");
            $("#username").val("");
            $("#password").val("");
        }

    });
    
    

