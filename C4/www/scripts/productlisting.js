//Press Show all to see products

$(document).ready(function () {

    //Activiating this fuction;
    getProduct();

    //Creating a function that get product basic details from the database
    function getProduct() {
        var url = "https://bitmp08.projectsbit.org/MobileApp/getproducts.php";
        // this  the start of a ajax function (a fuction use to call to php for database query)
        $.ajax({
            // 1. set the destination for this package of content
            url: url,
            //2. the ways use to sent the package
            method: 'POST',
            //3. Give the package a name for the PHP side to open the correct package
            data: { GET_PRODUCT: 5 },
            //4. Break open the response received 
            success: function (response) {
                console.log(response);
                var resp = jQuery.parseJSON(JSON.stringify(response));



                var responselength = resp.message.length;


                if (resp.status === 1) {
                    //creating a variable to store the final display conetent          
                    var ProductContent = '';
                    // creating two varible for the limit of items looped out each row in the page.
                     //var tableitemcount = 0;
                     //var tableitemlimit = 7;





                    //Looping the products out
                    $.each(resp.message, function (index, value) {

                     // if (tableitemcount < tableitemlimit) {
                        ProductContent +=

                            '<div class="col-xs-6">' +
                            '<div class="panel panel-info">' +          
                            '<div class="panel-heading" style="font-size: px;">' + value.product_id +'<br>'+ value.product_name + '</div>' +
                            '<div class="panel-body">' +
                            '<img src="https://bitmp08.projectsbit.org/product_images/' + value.product_picture + '"style="width:100px; height:100px;"/>' +
                            '</div><div class="panel-heading">$' + value.product_price + '.00' +
                            '<br>' + value.product_brand +
                            '<br>' + value.product_color +
                            '<br>' + value.product_category +
                            '<br>' +   
                            '<button pid="' + value.product_id + '" pname="' + value.product_name
                            + '" pprice="' + value.product_price + '" ppicture="' + value.product_picture
                            + '"  ppicture2="' + value.product_picture_2 + '"  ppicture3="' + value.product_picture_3
                            + '"  ppicture4="' + value.product_picture_4 + '" pbrand="' + value.product_brand + '" pcolor="'
                            + value.product_color + '" pcategory="' + value.product_category
                            + '"  align: center  class="btn btn-success view-product btn-xs centeritem">View</button>' +
                            '<button pid="' + value.product_id + '">Add</button> '
                            + '</div></div></div>';
                                                                                          
                        
   
             


                        
                          //tableitemcount++;



                     // }
                     // else if (tableitemcount === tableitemlimit) {
                         // tableitemcount = 0;
                         // ProductContent += '<tr>';

                    //  }



                    });

                   // ProductContent += '</tr>';

                    $("#product_list").html(ProductContent);


               // } else if (resp.status == 0) {

               //     $("#product_list").html(resp.message);

                




                }
            }
        })
    }

});



$(document.body).on('click', '.search-btn', function () {

    searchProduct();

});


function searchProduct() {
    var url = serverURL() + "/getproducts.php";
    // this  the start of a ajax function (a fuction use to call to php for database query)
    $.ajax({
        // 1. set the destination for this package of content
        url: url,
        //2. the ways use to sent the package
        method: 'POST',
        //3. Give the package a name for the PHP side to open the correct package
        data: $("#product-search-form").serialize(),
        //4. Break open the response received 
        success: function (response) {
            console.log(response);
            var resp = jQuery.parseJSON(JSON.stringify(response));
            if (resp.status == 1) {
                //creating a variable to store the final display conetent          
                var ProductContent = '';
                // creating two varible for the limit of items looped out each row in the page.
                var tableitemcount = 0;
                var tableitemlimit = 4;

                ProductContent += '<tr>';
                //Looping the products out
                $.each(resp.message, function (index, value) {

                    if (tableitemcount < tableitemlimit) {
                        ProductContent +=
                            '<td>' +
                            '<div class="col-md-4">' +
                            '<div class="panel panel-info">' +
                            '<div class="panel-heading">' + value.product_name + '</div>' +
                            '<div class="panel-body">' +
                            '<img src="https://bitmp08.projectsbit.org/product_images/' + value.product_picture + '"style="width:160px; height:150px;"/>' +
                            '</div><div class="panel-heading">$' + value.product_price + '.00' +
                            '<br>' + value.product_brand +
                            '<br>' + value.product_color +
                            '<br>' + value.product_category +
                            '<br>' +
                            '<button  align: center onclick="myFunction()" class="btn btn-danger btn-xs">Edit</button></div></div></div></td>';

                        tableitemcount++;

                    }
                    else if (tableitemcount === tableitemlimit) {
                        tableitemcount = 0;
                        ProductContent += '<tr>';

                    }
                });

                ProductContent += '</tr>';

                $("#product_list").html(ProductContent);

            } else if (resp.status == 0) {

                $("#product_list").html(resp.message);

            }
        }
    })
}






$(document.body).on('click', '.view-product', function () {

    var productid = $(this).attr('pid');
    var productname = $(this).attr('pname');
    var productprice = $(this).attr('pprice');
    var productpicture = $(this).attr('ppicture');
    var productpicture2 = $(this).attr('ppicture2');
    var productpicture3 = $(this).attr('ppicture3');
    var productpicture4 = $(this).attr('ppicture4');
    var productbrand = $(this).attr('pbrand');
    var productcolor = $(this).attr('pcolor');
    var productcategory = $(this).attr('pcategory');


    localStorage["productid"] = productid;
    localStorage["productname"] = productname;
    localStorage["productprice"] = productprice;
    localStorage["productpicture"] = productpicture;
    localStorage["productpicture2"] = productpicture2;
    localStorage["productpicture3"] = productpicture3;
    localStorage["productpicture4"] = productpicture4;
    localStorage["productbrand"] = productbrand;
    localStorage["productcolor"] = productcolor;
    localStorage["productcategory"] = productcategory;

    /*alert(productid);
    alert(productname);
    alert(productprice);
    alert(productpicture);
    alert(productpicture2);
    alert(productpicture3);
    alert(productpicture4);
    alert(productbrand);
    alert(productcolor);
    alert(productcategory);*/



    window.location.href = "productdetails.html";


});

