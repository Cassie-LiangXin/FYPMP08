
var email = $("#email");

//var url = serverURL() + "/forgetpassword.php";

$(document).ready(function () {
    $('.resetrequest').on('click', function () {
        if (email.val() != "") {
            email.css('border', '1px solid green');

            $.ajax({
                url: "https://bitmp08.projectsbit.org/MobileApp/forgetpassword.php",
                method: 'POST',
                dataType: 'text',
                data: {
                    email: email.val()
                }, success: function (response) {
                    if (!response.success)
                        $("#response").html(response.msg).css('color', "red");
                        
                }

            });
        } else
            email.css('border', '1px solid red');

    });
});

