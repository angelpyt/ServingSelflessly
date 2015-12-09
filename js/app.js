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
        $http.get('data/data.json').then(function(response) {
            var data = response.data
            $scope.mapData = data
            $scope.sortType = 'name'
            buildMap(data)
        })

        var buildMap = function(data) {
            var map = L.map('map').setView([40, -100], 5);
            var layer = L.tileLayer('https://api.mapbox.com/v4/mapbox.high-contrast/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGlzYWxseSIsImEiOiJjaWZzZWs2M3oxOWw2b2VrcnRobzh4OGRiIn0.fkN85EVGVV_JCobEVLwrJQ');
            layer.addTo(map);
            buildData(data, map); 

        }

        var buildData = function(data, map) {
            var ntee1 = new L.layerGroup([]);
            var ntee2 = new L.layerGroup([]);
            var ntee3 = new L.layerGroup([]);
            var ntee4 = new L.layerGroup([]);
            var ntee5 = new L.layerGroup([]);
            var ntee6 = new L.layerGroup([]);
            var ntee7 = new L.layerGroup([]);
            var ntee8 = new L.layerGroup([]);
            var ntee9 = new L.layerGroup([]);


            for (var i = 0; i < data.length; i++) {
                var name = data[i].name;
                var nccsweb = data[i].nccsweb;
                var guidestar = data[i].guidestar;
                var lat = data[i].lat;
                var lng = data[i].lng;
                var id = data[i].id;

                if (id == "1") {
                    var circle = new L.circleMarker([lat, lng], {
                        radius: 5,
                        fillOpacity: 0.5,
                        color: "red"
                    });
                    circle.bindPopup(name + "<br>" + "more information".link(guidestar));
                    circle.addTo(ntee1);
                } else if (id == "2") {
                    var circle = new L.circleMarker([lat, lng], {
                        radius: 5,
                        fillOpacity: 0.5,
                        color: "blue"
                    });
                    circle.bindPopup(name + "<br>" + "more information".link(guidestar));
                    circle.addTo(ntee2);
                } else if (id == "3") {
                    var circle = new L.circleMarker([lat, lng], {
                        radius: 5,
                        fillOpacity: 0.5,
                        color: "green"
                    });
                    circle.bindPopup(name + "<br>" + "more information".link(guidestar));
                    circle.addTo(ntee3);
                } else if (id == "4") {
                    var circle = new L.circleMarker([lat, lng], {
                        radius: 5,
                        fillOpacity: 0.5,
                        color: "light-blue"
                    });
                    circle.bindPopup(name + "<br>" + "more information".link(guidestar));
                    circle.addTo(ntee4);
                } else if (id == "5") {
                    var circle = new L.circleMarker([lat, lng], {
                        radius: 5,
                        fillOpacity: 0.5,
                        color: "pink"
                    });
                    circle.bindPopup(name + "<br>" + "more information".link(guidestar));
                    circle.addTo(ntee5);
                } else if (id == "6") {
                    var circle = new L.circleMarker([lat, lng], {
                        radius: 5,
                        fillOpacity: 0.5,
                        color: "purple"
                    });
                    circle.bindPopup(name + "<br>" + "more information".link(guidestar));
                    circle.addTo(ntee6);
                } else if (id == "7") {
                    var circle = new L.circleMarker([lat, lng], {
                        radius: 5,
                        fillOpacity: 0.5,
                        color: "orange"
                    });
                    circle.bindPopup(name + "<br>" + "more information".link(guidestar));
                    circle.addTo(ntee7);
                } else if (id == "8") {
                    var circle = new L.circleMarker([lat, lng], {
                        radius: 5,
                        fillOpacity: 0.5,
                        color: "white"
                    });
                    circle.bindPopup(name + "<br>" + "more information".link(guidestar));
                    circle.addTo(ntee8);
                } else {
                    var circle = new L.circleMarker([lat, lng], {
                        radius: 5,
                        fillOpacity: 0.5,
                        color: "black"
                    });
                    circle.bindPopup(name + "<br>" + "more information".link(guidestar));
                    circle.addTo(ntee9);
                }

            }

            var layer = {
                "Arts, Culture & Humanities": ntee1,
                "Education": ntee2,
                "Environment and Animals": ntee3,
                "Health": ntee4,
                "Human Services": ntee5,
                "International Foreign Affairs": ntee6,
                "Public, Societal Benefit": ntee7,
                "Religion Related": ntee8,
                "Mutal/Membership Benefit": ntee9
            }

            L.control.layers(null, layer).addTo(map);
        }
        
    })

    // Forum page controller
    .controller('ForumController', function($scope){
        //log user out
        $("#logoutButton").on("click", function() {
            if (currentUser != null) {
                Parse.User.logOut();
                location.reload();
                alert("You have successfully logged out");
            }
        })

        Parse.initialize("WQe7zzFFG3JYkV9BP6f6Hu6T4q2uSYD9jffBLHcp", "y9hajTS7877LR6ByHV7kqlQ8US1MiSvjIhVO2esd");

        var Review = Parse.Object.extend('Review');

        var currentUser = Parse.User.current();

        // if there is a current user then the signup should turn to logout
        if(currentUser) {
            $("#signupButton").hide();
            // $("#logoutButton").show();
            $("#logoutButton").show().text(currentUser.get('username') + ", Log out");
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
                    alert("You must include a title and a content!");
                    return false;
                } 
                review.save(null, {
                    success:function() {
                        title.val('');
                        content.val('');
                        getData();
                    }
                })
            } else {
                alert("Sign in first!");
                window.location.assign("/#/user")
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
            $('#reviewArea').empty();
            data.forEach(function(d){
                rating += d.get('rating');
                addItem(d);
            })
        }

        //this function takes in an item, adds it to the sreen
        var addItem = function(item) {
            var title = item.get('title');
            var content = item.get('content');
            var rating = item.get('rating');
            var date = item.get('date');
            var votes = item.get('votes');
            var helpful = item.get('helpful');
            var user = item.get("user");

            var div = $('<div class = "well"></div>');
            var Title = $('<div id = "T"></div>');
            Title.text(title);
            var Content = $('<div id = "C"></div>');
            Content.text(content);
            var D = $('<div id = "Date"></div>');
            D.text(" Created on " + date + " by " + user.getUsername()); 
            var Rate = $('<div id = "R"></div>');
            var Helpful = $('<div id = "H"></div>');

            var voteUp = $("<button id='votingUp'><span class='glyphicon glyphicon-thumbs-up'></span></button>");
            var voteDown = $("<button id='votingDown'><span class='glyphicon glyphicon-thumbs-down'></span></button>");
            var button = $('<button id="button" class="btn-warning btn-xs"><span class="glyphicon glyphicon-remove"></span></button>');

            //delete comment by users themself
            button.click(function() {
                if (currentUser.id == user.id) {
                    item.destroy({
                        success:getData
                    })
                }
            })

            //vote up for a comment
            voteUp.on("click", function() {
                if (currentUser == null) {
                    alert ("Sign in to vote");
                    window.location.assign("/#/user")
                } else {
                    item.set("helpful", helpful +=1);
                    item.set("votes", votes += 1);
                    item.save();
                    getData();
                }  
            });

            //vote down for a comment
            voteDown.on("click", function() {
                if (currentUser == null) {
                    alert ("Sign in to vote");
                    window.location.assign("/#/user")
                } else {
                    item.set("votes", votes += 1);
                    item.save();
                    getData();
                }
            });

            //display description for comments 
            if (votes != 0) {
                Helpful.text(helpful + " out of " + votes + " found this story awesome.");
            } else {
                Helpful.text("This story has not been voted yet. Be the first!")
            }

            //only current user can see their comment
            if (currentUser != null && currentUser.id == user.id) {
                div.append(button);
            }

            div.append(Rate);
            div.append(Title);
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

    // User page controller
    .controller('UserController', function($scope){

        Parse.initialize("WQe7zzFFG3JYkV9BP6f6Hu6T4q2uSYD9jffBLHcp", "y9hajTS7877LR6ByHV7kqlQ8US1MiSvjIhVO2esd");

        //switch signup and signin forms
        $(document).ready(function(){
            $("#relocate-login").click(function(){
                $("#signin").show();
                $("#signup").hide();
            });
            $("#relocate-create").click(function(){
                $("#signin").hide();
                $("#signup").show();
            });

        });

        Parse.User.logOut();


        // user signup form
        $("#signup-form").submit(function() {
            var username = $('#new-username').val();
            var password = $('#new-password').val();
            var passwordConfirm = $('#new-password-confirm').val();
            if(password === passwordConfirm) {
            var user = new Parse.User();
                user.set("username", $("#new-username").val());
                user.set("password", $("#new-password").val());
                user.set("passwordConfim", $("#new-password-confirm").val());
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
            } else {
                alert('Passwords don\'t match');
            }
        })

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

        //check password matches for the confirmed password
        function checkPass() {
            //Store the password field objects into variables ...
            var pass1 = document.getElementById('pass1');
            var pass2 = document.getElementById('pass2');
            //Store the Confimation Message Object ...
            var message = document.getElementById('confirmMessage');
            //Set the colors we will be using ...
            var goodColor = "#66cc66";
            var badColor = "#ff6666";
            //Compare the values in the password field 
            //and the confirmation field
            if(pass1.value == pass2.value){
                //The passwords match. 
                //Set the color to the good color and inform
                //the user that they have entered the correct password 
                pass2.style.backgroundColor = goodColor;
                message.style.color = goodColor;
                message.innerHTML = "Passwords Match!"
            } else{
                //The passwords do not match.
                //Set the color to the bad color and
                //notify the user.
                pass2.style.backgroundColor = badColor;
                message.style.color = badColor;
                message.innerHTML = "Passwords Do Not Match!"
            }
        }  

    });
    
    

