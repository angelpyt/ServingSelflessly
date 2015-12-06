// only shows login option if user clicks login
$(document).ready(function(){
    $("#login_id").click(function(){
        console.log("clicked");
        $("#signin").show();
        $("#signup").hide();
    });
    $("#relocate-create").click(function() {
        console.log("relocate to create account");
        $("#signin").hide();
        $("#signup").show();
    });
})

// Initialize parse and log user out 
Parse.initialize("WQe7zzFFG3JYkV9BP6f6Hu6T4q2uSYD9jffBLHcp", "y9hajTS7877LR6ByHV7kqlQ8US1MiSvjIhVO2esd");
Parse.User.logOut();


$("#out").on("click", function() {
    if (currentUser != null) {
        Parse.User.logOut();
        location.reload();
        alert("You have successfully logged out");
    }
})

//sign up for user
$("#signup").submit(function() {
    var user = new Parse.User();

    user.set("username", $("#new-username").val());
    user.set("password", $("#new-password").val());
    user.set("passwordConfirm", $("#new-password-confirm").val());
    user.set("reviews", []);

    user.signUp(null, {
            success: function(user) {
                Parse.User.logIn($("#new-username").val(), $("#new-password").val(), {
                    success: function(user) {
                    document.location.href = "index.html";
                  },
                  error: function(error) {
                    // alert("Error: " + error.code + " "+ error.message);
                    alert(error.message);
                    clearInput();
                  }
                });
            }
        });
        return false;
});


//sign in for user
$("#signin").submit(function() {
    Parse.User.logIn($("#username").val(), $("#password").val(), {
        success: function(user) {
            document.location.href = "index.html";
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
            clearInput();   
        }   
    });
    return false;
});

// clears all input
var clear = function() {
    $("#username").val("");
    $("#password").val("");
    $("#new-username").val("");
    $("#new-password").val("");
}


// // Create application with dependency 'firebase'
// var myApp = angular.module('myApp', ['firebase']);
// // Bind controller, passing in $scope, $firebaseAuth, $firebaseArray, $firebaseObject
// myApp.controller('myCtrl', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject){
//     // Create a variable 'ref' to reference your firebase storage
//     var ref = new Firebase("https://ss-user-app.firebaseio.com/");

//     var usersRef = ref.child("users");

//     // Create authorization object that referes to firebase
//     $scope.authObj = $firebaseAuth(ref);

//     // Create a firebaseObject of your users, and store this as part of $scope
//     $scope.users = $firebaseObject(usersRef);

//     // Test if already logged in
//     var authData = $scope.authObj.$getAuth();
//     if (authData) {
//         $scope.userId = authData.uid;
//     } 
//     // SignUp function
//     $scope.signUp = function() {
//         // Create user
//         $scope.authObj.$createUser({
//             email: $scope.email,
//             password: $scope.password,          
//         })

//         // Once the user is created, call the logIn function
//         .then($scope.logIn)

//         // Once logged in, set and save the user data
//         .then(function(authData) {
//             $scope.userId = authData.uid;
//             $scope.users[authData.uid] ={
//                 username: $scope.username,
//             }
//             $scope.users.$save()
//         })

//         // Catch any errors
//         .catch(function(error) {
//             console.error("Error: ", error);
//         });
//     }

//     // SignIn function
//     $scope.signIn = function() {
//         $scope.logIn().then(function(authData){
//             $scope.userId = authData.uid;
//         })
//     }

//     // LogIn function
//     $scope.logIn = function() {
//         console.log('log in')
//         return $scope.authObj.$authWithPassword({
//             email: $scope.email,
//             password: $scope.password
//         })
//     }

//     // LogOut function
//     $scope.logOut = function() {
//         $scope.authObj.$unauth()
//         $scope.userId = false
//     }


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