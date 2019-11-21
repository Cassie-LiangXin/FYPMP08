
var email = $("#email");

//var url = serverURL() + "/forgetpassword.php";

$(document).ready(function () {
    $("#resetrequest").bind("click", function () {
        Fpassword();
       
    });
});


function Fpassword() {
    
        var url = serverURL() + "/forgetpassword.php";
        var result;


        customer_email = $("#txtemail").val();




        var JSONObject = {
            "resetrequestsubmit":1,
            "customer_email": customer_email
        };

       
        $.ajax({
            url: url,
            type: 'POST',
            data: JSONObject,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                alert("Ajax success");
                _getFpasswordResult(arr);
               
            },
            error: function () {
                alert("fail");
            }
        });
   
}

function _getFpasswordResult(arr) {
    if (arr[0].result.trim() !== "0") {
        localStorage.setItem("customer_email", customer_email);
        
        /*validationMsgs("Login OK", "Information", "OK");*/
        window.location = "login.html";
    }
    else {
        validationMsgs("Error in Email", "Validation", "Try Again");
    }
}
