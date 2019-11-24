

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
    var avg
    var sum = 0;
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
   // document.getElementById("productpicture").innerHTML = productpicture;
    //document.getElementById("productpicture2").innerHTML = productpicture2;
    //document.getElementById("productpicture3").innerHTML = productpicture3;
    //document.getElementById("productpicture4").innerHTML = productpicture4;
    document.getElementById("productbrand").innerHTML = productbrand;
    document.getElementById("productcolor").innerHTML = productcolor;
    document.getElementById("productcategory").innerHTML = productcategory;

    var profilepicture = "<img width='100%' height='100%' src='http://bitmp08.projectsbit.org/product_images/" + productpicture + "' />";
    $(".user-pic").html(profilepicture);

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
           // saveToTheDBratings();
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

    function saveToTheDBratings() {
        var reviewIndex = document.getElementById("review").value;

        //alert(ratedIndex);
        //alert(productid)

        var JSONObject = {
            "ratedIndex": ratedIndex,
            "productid": productid,
            "reviewIndex": reviewIndex
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
                alert("Success!");
                localStorage.removeItem("ratedIndex");

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


    $(document.body).on('click', '.submit', function () {

        saveToTheDBratings();


    });


    //View Ratings
    $(document).ready(function () {
        retrieveratings()



        function retrieveratings() {
            var url = serverURL() + "/getratings.php";

            var JSONObject = {
                "productid": productid
            };

            $.ajax({
                url: url,
                type: 'GET',
                data: JSONObject,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (arr) {
                    _getProfileResult(arr);
                    console.log(arr);

                    
                },
                error: function () {
                    alert("FAIL");
                }
            });
        }

        function _getProfileResult(arr) {

            $.each(arr, function (index, value) {
                sum = sum + parseInt(value.ratedIndex);
            });
            avg = sum / arr.length;
            document.getElementById("averagerating").innerHTML = Math.round(avg * 100) / 100;
            document.getElementById("arraylength").innerHTML = arr.length + '&nbsp;'+'users';

;


            //Total Stars
            const starsTotal = 5;
            const starPercentage = (avg / starsTotal) * 100;
            const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

            document.querySelector(`.stars-inner`).style.width = starPercentageRounded; 

        }
    });


    //Shopping Cart
    $(document).ready(function () {

        $(document.body).on('click', '.add-cart', function () {
            // var productid = $(this).attr('pid');
            //localStorage["productid"] = productid;
            addcart();

        });

        function addcart() {

            var url = serverURL() + "/shoppingcart.php";
            var result;

            //  var productid = productid;
            var customer_email = localStorage.getItem("customer_email");


            var JSONObject = {
                "productid": productid,
                "customer_email": customer_email
            };


            $.ajax({
                url: url,
                type: 'GET',
                data: JSONObject,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (arr) {
                    // _getaddcartResult(arr);
                    alert("Product Added to Cart!");
                    


                },
                error: function () {
                    alert("fail");
                }
            });

        }
    });




})();


