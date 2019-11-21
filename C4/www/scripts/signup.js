/*(function () {

    //Defining Variables
    var customer_first_name 
    var customer_last_name 
    var customer_address 
    var customer_city 
    var customer_postal_code
    var customer_country 
    var customer_date_of_birth 
    var customer_profile_picture 


    var customer_username;
    var customer_password;
    var customer_passwordagain;
    var customer_email;

    //Validation
    $(document).ready(function () {
        $("#NewUserForm").validate({
            rules: {
                txtNewEmail: {
                    email: true,
                    required: true
                },
                txtNewPasswordAgain: {
                    required: true,
                    equalTo: "#txtNewPassword"
                },
                txtNewPassword: {
                    required: true,
                    equalTo: "#txtNewPasswordAgain"
                },
                txtNewDescription: {
                    required: true,

                }
            },
            messages: {
                txtNewName: "<h25><i>*Enter a New User Name</i></h25>",
                txtNewEmail: "<h25><i>*new email address is required and must be of the format example@example.com</i></h25>",
                txtNewPassword: "<h25><i>*new password is required</i></h25>",
                txtNewPasswordAgain: "<h25><i>*new password is required again and must be the same as new password</i></h25>",
            },
            focusInvalid: false,
            submitHandler: function () {
                return false;
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().after());
            },
        });



        $("#btnCreateAccount").bind("click", function () {
            if ($("#NewUserForm").valid()) {
                savenewuser();
            }
        });
    });
       

    //New User Saving Section
    function savenewuser() {


        customer_first_name = $("#txtfirstname").val();
        customer_last_name = $("#txtlastname").val();
        customer_address = $("#txtAddress").val();
        customer_city = $("#txtcity").val();
        customer_postal_code = $("#txtpostalcode").val();
        customer_country = $("#txtcountry").val();
        customer_date_of_birth = $("#txtdob").val();

       
        customer_username = $("#txtUserID").val();
        customer_email = $("#txtNewEmail").val();
        customer_password = $("#txtNewPassword").val();
        customer_passwordagain = $("#txtNewPasswordAgain").val();
   
        var url = serverURL() + "/newuser.php";

        var JSONObject = {
            "customer_first_name": customer_first_name,
            "customer_last_name": customer_last_name,
            "customer_address": customer_address,
            "customer_city": customer_city,
            "customer_postal_code": customer_postal_code,
            "customer_country": customer_country,
            "customer_date_of_birth": customer_date_of_birth,



            "customer_username": customer_username,
            "customer_password": customer_password,
            "customer_email": customer_email,
 

        };

        $.ajax({
            url: url,
            type: 'GET',
            data: JSONObject,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                _getNewUserResult(arr);
            },
            error: function () {
                alert("Fail");
            }
        });


    }

    function _getNewUserResult(arr) {
        if (arr[0].result === 1) {
            localStorage.setItem("customer_username", customer_username);
            localStorage.setItem("customer_password", customer_password);
            //window.plugins.OneSignal.sendTag("email", email);
            alert("New User created");
            window.location = "uploadpicture.html";
        }
        else {

            alert("User ID already exist");
        }
    }

    
    $(document).ready(function () {


            $("#upload-btn").on('click', function () {


                var url = serverURL() + "/script.php";
                var formData = new FormData();
                var file = $("input[name='image']").prop('files')[0];

                formData.append('image', file);

                $.ajax({
                    url: url,
                    method: 'POST',
                    data: new FormData($("#file-upload")[0]),
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function (response) {
                        console.log(response);
                      //  var resp = $.parseJSON(response);

                        var resp = jQuery.parseJSON(JSON.stringify(response));

                        if (resp.status === 200) {

                            var img = "<img width='100%' height='100%' src='http://bitmp08.projectsbit.org/MobileApp/uploads/" + resp.message.path + "' />";
                            $(".user-pic").html(img);



                        }else if (resp.status !== 200) {
                            console.log(resp.message);
                        }

                    }

                })

            });

   

    });
    

})();*/








$(document).ready(function (e) {
    // Submit form data via Ajax
    $("#NewUserForm").on('submit', function (e) {
        if ($("#NewUserForm").valid()) {
            e.preventDefault();

            var url = serverURL() + "/upload.php";

            $.ajax({
                type: 'POST',
                url: url,
                data: new FormData(this),
                dataType: 'json',
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function () {
                    /*  $("#submit").attr("disabled", "disabled");
                      $('#NewUserForm').css("opacity", ".5");*/
                },
                success: function (response) { //console.log(response);
                    $('.statusMsg').html('');
                    if (response.status == 1) {
                        /* $('#NewUserForm')[0].reset(); */
                        /* $('.statusMsg').html('<p class="alert alert-success">' + response.message + '</p>');*/

                        var imageresponse = response.message;
                        localStorage.setItem("imageresponse", imageresponse);

                        //var profilepicture = "<img width='100%' height='100%' src='http://bitmp08.projectsbit.org/MobileApp/" + response.message + "' />";
                       // $(".user-pic").html(profilepicture);

     
                       
                        window.location = "login.html";                   

                    } else {
                        $('.statusMsg').html('<p class="alert alert-danger">' + response.message + '</p>');
                    }
                    $('#NewUserForm').css("opacity", "");
                    $(".submitBtn").removeAttr("disabled");
                }
            });
        }
    });
});


// File type validation
$("#file").change(function () {
    var file = this.files[0];
    var fileType = file.type;
    var match = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!((fileType == match[0]) || (fileType == match[1]) || (fileType == match[2]))) {
        $("#info").html('<h25><i>Sorry, only JPG, JPEG, & PNG files are allowed to upload.</i></h25>');
        $("#file").val('');
        return false;
    }
});

//Date Joined
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}
if (mm < 10) {
    mm = '0' + mm;
}
var today = dd + '/' + mm + '/' + yyyy;
document.getElementById('date').value = today;



//Validation
$(document).ready(function () {
    $("#NewUserForm").validate({
        rules: {
            txtfirstname: {
                required: true,
                pattern: "^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$",
            },
            txtlastname: {
                required: true,
                pattern: "^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$",
            },
            txtAddress: {
                required: true
            },
            txtcity: {
                required: true
            },
            txtpostalcode: {
                required: true,
                digits: true,
                minlength: 6,
                maxlength: 6,
            },
            txtcountry: {
                required: true
            },
            txtdob: {
                required: true
            },
            txtUserID: {
                required: true
            },
            txtNewPassword: {
                required: true,
                equalTo: "#txtNewPasswordAgain"
            },
            txtNewPasswordAgain: {
                required: true,
            },
            email: {
                required: true,
                email:true
            },
            file: {
                required: true,
            }, 


        },
        messages: {
            txtfirstname: {
                required: "<h25><i>*Enter Your First Name</i></h25>",
                pattern: "<h25><i>*Enter letters only!</i></h25>",
            },
            txtlastname: {
                required: "<h25><i>*Enter Your Last Name</i></h25>",
                pattern: "<h25><i>*Enter letters only!</i></h25>",
            },
            txtAddress: {
                required: "<h25><i>*Enter Your Address</i></h25>",
            },
            txtcity: {
                required: "<h25><i>*Enter Your City!</i></h25>",
            },
            txtpostalcode: {
                required: "<h25><i>*Enter Your Postal Code!</i></h25>",
                digits: "<h25><i>*Enter digits only!</i></h25>",
                minlength: "<h25><i>Postal Code only consist of 6 digits!</i></h25>",
                maxlength: "<h25><i>Postal Code only consist of 6 digits!</i></h25>",

            },
            txtcountry: {
                required: "<h25><i>*Enter Your Country!</i></h25>",
            },
            txtdob: {
                required: "<h25><i>*Enter Your Date of Birth!</i></h25>",
            },
            txtUserID: {
                required: "<h25><i>*Enter Your Username!</i></h25>",
            },
            txtNewPassword: {
                required: "<h25><i>*Enter Your Password!</i></h25>",
                equalTo: "<h25><i>*Enter the Password Again below!</i></h25>"
            },
            txtNewPasswordAgain: {
                required: "<h25><i>*Enter Your Password again! and must be the same as new password</i></h25>",
            },
            txtNewPasswordAgain: {
                required: "<h25><i>*Enter Your Password again! and must be the same as new password</i></h25>",
            },
            email: {
                required: "<h25><i>*Enter your Email Address</i></h25>",
                email: "<h25><i>*EmailAddress is required example@example.com</i></h25>",
            },
            file: {
                required: "<h25><i>*Profile Picture Required!</i></h25>",

            },

        },
        focusInvalid: false,
        submitHandler: function () {
            return false;
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent().parent().after());
        },
    });

});
