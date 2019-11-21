(function () {
            
    var customer_address = localStorage.getItem("customer_address");
    var customer_city = localStorage.getItem("customer_city");
    var customer_postal_code = localStorage.getItem("customer_postal_code");
    
    
    document.getElementById("txtOldAddress").value = customer_address
    document.getElementById("txtNewAddress").value = customer_address

    document.getElementById("txtOldCity").value = customer_city
    document.getElementById("txtNewCity").value = customer_city

    document.getElementById("txtOldPostalCode").value = customer_postal_code
    document.getElementById("txtNewPostalCode").value = customer_postal_code
     
       

    //Address Section
    function changeAddress() {
        var oldaddress = $("#txtOldAddress").val();
        var newaddress = $("#txtNewAddress").val();


        var url = serverURL() + "/savenewaddress.php";

        var JSONObject = {
            "customer_username": localStorage.getItem("customer_username"),
            "oldaddress": oldaddress,
            "newaddress": newaddress,
        };

        $.ajax({
            url: url,
            type: 'GET',
            data: JSONObject,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                _changeAddressResult(arr);
            },
            error: function () {
                alert("FAIL");
            }
        });
    }

    function _changeAddressResult(arr) {
        if (arr[0].result === 1) {
            /*localStorage.setItem($("#txtNewPassword").val(), customer_username);*/
            alert("OK!")

        }
        else {
            alert("FAIL2");
        }
    }

    //City Section
    function changeCity() {
        var oldcity = $("#txtOldCity").val();
        var newcity = $("#txtNewCity").val();
 
        var url = serverURL() + "/savenewcity.php";

        var JSONObject = {
            "customer_username": localStorage.getItem("customer_username"),
            "oldcity": oldcity,
            "newcity": newcity,
        };

        $.ajax({
            url: url,
            type: 'GET',
            data: JSONObject,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                _changeAddressResult(arr);
            },
            error: function () {
                alert("FAIL");
            }
        });
    }

    function _changeAddressResult(arr) {
        if (arr[0].result === 1) {
            /*localStorage.setItem($("#txtNewPassword").val(), customer_username);*/
            alert("OK!")
        }
        else {
            alert("FAIL2");
        }
    }

    //Postal Code Section
    function changePostalCode() {
        var oldpostalcode = $("#txtOldPostalCode").val();
        var newpostalcode = $("#txtNewPostalCode").val();

        var url = serverURL() + "/savenewpostalcode.php";

        var JSONObject = {
            "customer_username": localStorage.getItem("customer_username"),
            "oldpostalcode": oldpostalcode,
            "newpostalcode": newpostalcode
        };

        $.ajax({
            url: url,
            type: 'GET',
            data: JSONObject,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                _changeAddressResult(arr);
            },
            error: function () {
                alert("FAIL");
            }
        });
    }

    function _changeAddressResult(arr) {
        if (arr[0].result === 1) {
            /*localStorage.setItem($("#txtNewPassword").val(), customer_username);*/
            alert("OK!")
                       
        }
        else {
            alert("FAIL2");
        }
    }

jQuery.validator.addMethod("alphanumeric", function (value, element) {
    return this.optional(element) || /^[\w.]+$/i.test(value);
}, "Letters, numbers, and underscores only please");

    //Validation
    $("#ChangeAddressForm").validate({
        rules: {
            txtNewPostalCode: {
                required: true,
                minlength: 6,
                digits: true
            },

            txtNewCity: {
               digits: false
            },
            txtNewAddress: {
                required: true,
                alphanumeric: true
            }

        },
        messages: {
            txtNewAddress: {
                required: "Address is required",
                alphanumeric: "Letters, numbers, and underscores only please",
            },
            txtNewCity: {
                required: "City is required",
                digit: "Include only letters!",
            },
            txtNewPostalCode: {
                required: "Postal Code is required!",
                minlength: "Postal Code only contains 6 digits!",
                digits: "Postal Code only contains digits!"
            }
        },
        focusInvalid: false,
        submitHandler: function () {
            return false;
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent().parent().after());
        },
    });



    //Save Address Button Function
    $("#btnSaveAddress").bind("click", function () {

        if ($("#ChangeAddressForm").valid()) {
            changeAddress();
            changeCity();
            changePostalCode();            
        }
    });

})();











