// only shows login option if user clicks login
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

})

Parse.User.logOut();
Parse.initialize("WQe7zzFFG3JYkV9BP6f6Hu6T4q2uSYD9jffBLHcp", "y9hajTS7877LR6ByHV7kqlQ8US1MiSvjIhVO2esd");


//sign up for user
$("#signup").submit(function() {
    if(password === passwordConfirm) {
        var user = new Parse.User();

        user.set("username", $("#new-username").val());
        user.set("password", $("#new-password").val());
        user.set("passwordConfirm", $("#new-password-confirm").val());
        user.set("reviews", [])

        user.signUp(null, {
                success: function(user) {
                    Parse.User.logIn($("#new-username").val(), $("#new-password").val(), {
                        success: function(user) {
                        document.location.href = "index.html";
                      },
                      error: function(error) {
                        alert("Error: " + error.code + " "+ error.message);
                        clearInput();
                      }
                    });
                }
            });
        // return false;
    } else {
         alert('Passwords don\'t match');
    }
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