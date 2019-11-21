$(document).ready(function (e) {
    // Submit form data via Ajax
    $("#NewUserForm").on('submit', function (e) {
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
                $('.submitBtn').attr("disabled", "disabled");
                $('#NewUserForm').css("opacity", ".5");
            },
            success: function (response) { //console.log(response);
                $('.statusMsg').html('');
                if (response.status == 1) {
                    $('#NewUserForm')[0].reset();
                    $('.statusMsg').html('<p class="alert alert-success">' + response.message + '</p>');
                } else {
                    $('.statusMsg').html('<p class="alert alert-danger">' + response.message + '</p>');
                }
                $('#NewUserForm').css("opacity", "");
                $(".submitBtn").removeAttr("disabled");
            }
        });
    });
});


// File type validation
$("#file").change(function () {
    var file = this.files[0];
    var fileType = file.type;
    var match = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!((fileType == match[0]) || (fileType == match[1]) || (fileType == match[2]))) {
        alert('Sorry, only JPG, JPEG, & PNG files are allowed to upload.');
        $("#file").val('');
        return false;
    }
});