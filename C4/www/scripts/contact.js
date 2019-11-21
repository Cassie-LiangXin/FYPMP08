(function () {

    var feedback_sender_name
    var feedback_sender_email
    var feedback_subject
    var feedback_message


    $(document).ready(function () {
        $("#SendFeedbackForm").validate({
            rules: {
                txtfeedback_sender_email: {
                    email: true,

                },
                txtfeedback_subject: {
                    required: true,

                },
                txtfeedback_message: {
                    required: true,

                },

            },
            messages: {
                txtfeedback_sender_email: "<h25><i>*new email address is required and must be of the format example@example.com</i></h25>",
                txtfeedback_subject: "<h25><i>*Subject Required</i></h25>",
                txtfeedback_message: "<h25><i>*Required to key in more details</i></h25>",
            },
            focusInvalid: false,
            submitHandler: function () {
                return false;
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().after());
            },
        });



        $("#btnSendFeedback").bind("click", function () {
            if ($("#SendFeedbackForm").valid()) {
                sendfeedback();
            }
        });
    });




    //New User Saving Section
    function sendfeedback() {


        feedback_sender_name = $("#txtfeedback_sender_name").val();
        feedback_sender_email = $("#txtfeedback_sender_email").val();
        feedback_subject = $("#txtfeedback_subject").val();
        feedback_message = $("#txtfeedback_message").val();




        var url = serverURL() + "/sendfeedback.php";

        var JSONObject = {
            "feedback_sender_name": feedback_sender_name,
            "feedback_sender_email": feedback_sender_email,
            "feedback_subject": feedback_subject,
            "feedback_message": feedback_message,



        };

        $.ajax({
            url: url,
            type: 'GET',
            data: JSONObject,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                _getNewSendFeedbackResult(arr);
            },
            error: function () {
                alert("Fail");
            }
        });


    }

    function _getNewSendFeedbackResult(arr) {
        if (arr[0].result === 1) {
            localStorage.setItem("feedback_sender_name", feedback_sender_name);
            localStorage.setItem("feedback_sender_email", feedback_sender_email);
            localStorage.setItem("feedback_subject", feedback_subject);
            localStorage.setItem("feedback_message", feedback_message);
            //window.plugins.OneSignal.sendTag("email", email);
            alert("Successfully sent feedback");
            //window.location = "profile.html";
        }
        else {

            alert("Error in the system");
        }
    }
})();

function toggleDisabled(_checked) {
    document.getElementById('txtfeedback_sender_email').disabled = _checked ? true : false;
    document.getElementById('txtfeedback_sender_name').disabled = _checked ? true : false;
}















