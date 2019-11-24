

    var customer_username;
    var customer_password;
    var customer_email;



    $(document).ready(function () {


        $("#LoginForm").validate({
            messages: { 
                txtLogin: "<h25><i>*User ID or Email ID is required</i></h25>",
                txtPassword: "<h25><i>*Password is required</i></h25>",
            },
            focusInvalid: false,
            submitHandler: function () {
                return false;
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().after());
            },
        });

        $("#btnLogin").bind("click", function () {
                login();
        });

        $("#btnNewUser").bind("click", function () {
            window.location = "newuser.html";
        });

    });




    function login() {
        if ($("#LoginForm").valid()) {
            var url = serverURL() + "/login.php";
            var result;


            customer_username = $("#txtLogin").val();
            customer_password = $("#txtPassword").val();
            customer_email = $("#txtLogin").val();

     


            var JSONObject = {
                "customer_username": customer_username,
                "customer_password": customer_password,
                "customer_email": customer_email
            };


            $.ajax({
                url: url,
                type: 'GET',
                data: JSONObject,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (arr) {
                    _getLoginResult(arr);
                },
                error: function () {
                   alert("fail");
                }
            });
        }
    }

    function _getLoginResult(arr) {
        if (arr[0].result.trim() !== "0") {
            localStorage.setItem("customer_username", customer_username);
            localStorage.setItem("customer_password", customer_password);
            localStorage.setItem("customer_email", customer_email);
            
            /*validationMsgs("Login OK", "Information", "OK");*/
            window.location = "profile.html";
        }
        else {
            
            validationMsgs("Error in Username or Password", "Validation", "Try Again");          
        }
    }



 



