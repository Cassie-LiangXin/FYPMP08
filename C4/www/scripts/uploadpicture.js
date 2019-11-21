(function () {


    var customer_username = localStorage.getItem("customer_username")
    var customer_password = localStorage.getItem("customer_password")

    

    alert(customer_username);
    alert(customer_password);


    document.getElementById("txtFirstName").innerHTML = customer_username;

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

})();