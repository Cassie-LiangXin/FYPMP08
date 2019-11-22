//Press Show all to see products

$(document).ready(function () {

 

    //Activiating this fuction;
    GET_ShoppingCart();
  
    //Creating a function that get product basic details from the database
    function GET_ShoppingCart() {
        var useremail = localStorage.getItem("customer_email");
        var url = "https://bitmp08.projectsbit.org/MobileApp/getshoppingcart.php";
        // this  the start of a ajax function (a fuction use to call to php for database query)
        $.ajax({
            // 1. set the destination for this package of content
            url: url,
            //2. the ways use to sent the package
            method: 'POST',
            //3. Give the package a name for the PHP side to open the correct package
            data: { GET_ShoppingCart: 1 },
            //4. Break open the response received 
            success: function (response) {
                console.log(response);
                var resp = jQuery.parseJSON(JSON.stringify(response));


            
                var responselength = resp.message.length;


                if (resp.status === 1) {
                    //creating a variable to store the final display conetent          
                    var ProductContent = '';
                    ProductContent +=


                        ' <h1>ShoppingCart</h1>'
                    + ' <h1>productID</h1>'


                        ;

                    $.each(resp.message, function (index, value) {
                       
                        if (useremail === value.customer_email) {
                            

                            ProductContent +=


                                ' <input type="checkbox" name="vehicle1" value="Bike"> ' + value.product_id + '<br>'


                                ;

                        }


                    });
                    ProductContent +=


                        ' <button>Make Order</button>'


                        ;

                    $("#shoppingcart_list").html(ProductContent);


                }
            }
        });
    }

});





