(function () {



    var productid = localStorage.getItem("productid");
    var productname = localStorage.getItem("productname");
    var productprice = localStorage.getItem("productprice");
    var productpicture = localStorage.getItem("productpicture");
    var productpicture2 = localStorage.getItem("productpicture2");
    var productpicture3 = localStorage.getItem("productpicture3");
    var productpicture4 = localStorage.getItem("productpicture4");
    var productbrand = localStorage.getItem("productbrand");
    var productcolor = localStorage.getItem("productcolor");
    var productcategory = localStorage.getItem("productcategory");

   /* alert(productid);
    alert(productname);
    alert(productprice);
    alert(productpicture);
    alert(productpicture2);
    alert(productpicture3);
    alert(productpicture4);
    alert(productbrand);
    alert(productcolor);
    alert(productcategory);*/

    document.getElementById("productid").innerHTML = productid;
    document.getElementById("productname").innerHTML = productname;
    document.getElementById("productprice").innerHTML = productprice;
    document.getElementById("productpicture").innerHTML = productpicture;
    //document.getElementById("productpicture2").innerHTML = productpicture2;
    //document.getElementById("productpicture3").innerHTML = productpicture3;
    //document.getElementById("productpicture4").innerHTML = productpicture4;
    document.getElementById("productbrand").innerHTML = productbrand;
    document.getElementById("productcolor").innerHTML = productcolor;
    document.getElementById("productcategory").innerHTML = productcategory;


    //Ratings System
    var ratedIndex = -1;
    //var uID = 0;


    $(document).ready(function () {
        resetStarColors();

        if (localStorage.getItem('ratedIndex') != null)
            setStars(parseInt(localStorage.getItem('ratedIndex')));

        $('.fa-star').on('click', function () {
            ratedIndex = parseInt($(this).data('index'));
            localStorage.setItem('ratedIndex', ratedIndex);          
           
            saveToTheDB();
        });




        $('.fa-star').mouseover(function () {
            resetStarColors();
            var currentIndex = parseInt($(this).data('index'));
            setStars(currentIndex);

        });

        $('.fa-star').mouseleave(function () {
            resetStarColors();

            if (ratedIndex != -1)
                setStars(ratedIndex);
        });

    });

    function saveToTheDB() {

        alert(ratedIndex);

        var JSONObject = {
            "ratedIndex": ratedIndex
          
        };

        

        var url = serverURL() + "/savestars.php";

        $.ajax({
            url: url,
            type: 'GET',
            data: JSONObject,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                //_changePasswordResult(arr);

                console.log(arr);

            },
            error: function () {
                alert("FAIL");
            }
        });

        function _changePasswordResult(arr) {
            if (arr[0].result === 1) {
                alert("Password Changed!")


            
            }
            else {
                alert("FAIL2");
            }
        }


    }

    function setStars(max) {
        for (var i = 0; i <= max; i++)
            $('.fa-star:eq(' + i + ')').css('color', 'green');
    }



    function resetStarColors() {
        $('.fa-star').css('color', 'white');
    }

})();