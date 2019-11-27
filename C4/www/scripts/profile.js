(function () {


    var customer_username;
    var customer_password;
    var customer_first_name;
    var customer_last_name;
    var customer_profile_picture;
    var customer_date_of_birth;
    var customer_address;
    var customer_city;
    var customer_postal_code;
    var customer_pic;
    
   //var imageresponse = localStorage.getItem("imageresponse");
    
  //  var profilepicture = "<img width='100%' height='100%' src='http://bitmp08.projectsbit.org/MobileApp/uploads/" + customer_pic + "' />";


    $(document).ready(function () {
        getProfile();

       // var profilepicture = "<img width='100%' height='100%' src='http://bitmp08.projectsbit.org/MobileApp/" + imageresponse + "' />";

      //  $(".user-pic").html(profilepicture);


        //Profile Section
        function getProfile() {
            var url = serverURL() + "/getprofile.php";

            var JSONObject = {
                "customer_username": localStorage.getItem("customer_username"),
                "customer_email": localStorage.getItem("customer_email")

            };

            $.ajax({
                url: url,
                type: 'GET',
                data: JSONObject,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (arr) {
                    _getProfileResult(arr);
                },
                error: function () {
                    alert("FAIL");
                }
            });
        }

        function _getProfileResult(arr) {
            customer_id = arr[0].customer_id;
            customer_username = arr[0].customer_username;
            customer_first_name = arr[0].customer_first_name;
            customer_last_name = arr[0].customer_last_name;
            customer_email = arr[0].customer_email;
            customer_password = arr[0].customer_password;
            customer_date_of_birth = arr[0].customer_date_of_birth;
            customer_address = arr[0].customer_address;
            customer_city = arr[0].customer_city;
            customer_pic = arr[0].customer_pic;
            customer_postal_code = arr[0].customer_postal_code;

           // alert(customer_pic);
           // alert(customer_username);
                  
            var profilepicture = "<img width='100%' height='100%' src='http://bitmp08.projectsbit.org/MobileApp/uploads/" + customer_pic + "' />";
            $(".user-pic").html(profilepicture);
            $("#lbluserid").html(customer_first_name);
            localStorage.setItem("customer_id", customer_id);
            localStorage.setItem("customer_username", customer_username);
            localStorage.setItem("customer_first_name", customer_first_name);
            localStorage.setItem("customer_last_name", customer_last_name);
            localStorage.setItem("customer_email", customer_email);
            localStorage.setItem("customer_password", customer_password);
            localStorage.setItem("customer_date_of_birth", customer_date_of_birth);
            localStorage.setItem("customer_address", customer_address);
            localStorage.setItem("customer_pic", customer_pic);
            localStorage.setItem("customer_city", customer_city);
            localStorage.setItem("customer_postal_code", customer_postal_code);


            
          



             


        }


    });
          


})();
































function shopping() {
    window.location = "productlisting.html";
}
function shoppingcart() {
    window.location = "shoppingcart.html";
}

function orders() {
    window.location = "orders.html";
}

function mydetails() {
    window.location = "mydetails.html";
}

function changepassword() {
    window.location = "changepassword.html";
}

function addressbook() {
    window.location = "addressbook.html";
}
