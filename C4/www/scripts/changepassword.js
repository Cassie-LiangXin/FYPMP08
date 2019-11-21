(function () {

    var customer_username = localStorage.getItem("customer_username");
    var customer_email = localStorage.getItem("customer_email");
    var customer_password = localStorage.getItem("customer_password");
    var customer_profile_picture;

    document.getElementById("txtOldEmail").value = customer_email
    document.getElementById("txtNewEmail").value = customer_email




//Password Section
function changePassword() {
    var oldpassword = $("#txtOldPassword").val();
    var newpassword = $("#txtNewPassword").val();

    var url = serverURL() + "/savenewpassword.php";

    var JSONObject = {
        "customer_username": customer_username,
        "oldpassword": oldpassword,
        "newpassword": newpassword
    };

    $.ajax({
        url: url,
        type: 'GET',
        data: JSONObject,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (arr) {
            _changePasswordResult(arr);
        },
        error: function () {
            alert("FAIL");
        }
    });
}

function _changePasswordResult(arr) {
    if (arr[0].result === 1) {
        /*localStorage.setItem($("#txtNewPassword").val(), customer_username);*/
        alert("Password Changed!")

        *$("#txtOldPassword").val("");
        $("#txtNewPassword").val("");
        $("#txtNewPasswordAgain").val("");
    }
    else {
        alert("FAIL2");
    }
}


//Password Validation
$("#ChangePasswordForm").validate({
    rules: {
        txtNewPasswordAgain: {
            equalTo: "#txtNewPassword"
        }
    },
    messages: {
        txtOldPassword: "Old password is required",
        txtNewPassword: "New password is required",
        txtNewPasswordAgain: "New password again is required and must be the same as new password",
    },
    focusInvalid: false,
    submitHandler: function () {
        return false;
    },
    errorPlacement: function (error, element) {
        error.appendTo(element.parent().parent().after());
    },
});


//Password Button Function
$("#btnSavePassword").bind("click", function () {

    if ($("#ChangePasswordForm").valid()) {
        changePassword();
    }
});


//Email Section
function changeEmail() {
    var oldemail = $("#txtOldEmail").val();
    var newemail = $("#txtNewEmail").val();


    var url = serverURL() + "/savenewemail.php";

    var JSONObject = {
        "customer_username": customer_username,
        "oldemail": oldemail,
        "newemail": newemail
    };

    $.ajax({
        url: url,
        type: 'GET',
        data: JSONObject,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (arr) {
            _changeEmailResult(arr);
        },
        error: function () {
            alert("FAIL");
        }
    });
}

function _changeEmailResult(arr) {
    if (arr[0].result === 1) {
        /*localStorage.setItem($("#txtNewPassword").val(), customer_username);*/
        alert("OK!")

    }
    else {
        alert("FAIL2");
    }
}


//Email Validation
  $("#ChangeEmailForm").validate({
      rules: {
          txtNewEmail: {
              required: true,
              email: true,
          },
      },
      messages: {
          txtNewEmail: {
              required: "Email cannot be blank!",
              email: "Email is not in the correct form!"
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


//Username Button Function
  $("#btnSaveEmail").bind("click", function () {

    if ($("#ChangeEmailForm").valid()) {
        changeEmail();
    }
});














})();