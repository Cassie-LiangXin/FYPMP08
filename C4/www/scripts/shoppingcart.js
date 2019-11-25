var sum = 0

$(document).ready(function () {

    GET_ShoppingCart();

    function GET_ShoppingCart() {
        var useremail = localStorage.getItem("customer_email");
        var url = "https://bitmp08.projectsbit.org/MobileApp/getshoppingcart.php";

        $.ajax({

            url: url,
            method: 'POST',
            data: { GET_ShoppingCart: 1 },
            success: function (response) {
                console.log(response);
                var resp = jQuery.parseJSON(JSON.stringify(response));
                var responselength = resp.message.length;

                if (resp.status === 1) {         
                    var ProductContent = '';
                  
                    $.each(resp.message, function (index, value) {
                        if (useremail === value.customer_email) {
                            ProductContent +=                              
                                '<div class="cart-row" >'+
                                    '<div class="cart-item cart-column">'+
                                        '<img class="cart-item-image" src="https://bitmp08.projectsbit.org/product_images/' + value.product_picture + '" width="100" height="100">' +
                                        '<span class="cart-item-title">' + value.product_name +'</span>'+
                                    '</div>'+

                                      '<span class="cart-price cart-column">$' + value.product_price +'</span>'+

                                        '<div class="cart-quantity cart-column">'+
                                       '<input id="' + value.product_id + '" class="cart-quantity-input" type="number" value="1">' +
                                         '<button id="' + value.product_id + '" class="btn btn-danger" type="button">REMOVE</button>'+
                                         '</div>'+
                                '</div>';

                             sum = sum + parseInt(value.product_price);
                            document.getElementsByClassName('cart-total-price')[0].innerText = '$' + sum
                        }
                    });                    
                    $(".cart-items").html(ProductContent);
                }
            }
        });
    }
    updateCartTotal()

        
    //Execute Remove
    $(document.body).on('click', '.btn-danger', function () {

            var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            var productid = $(this).attr('id');
            localStorage.setItem("productid", productid);
            removefromcart();
            updateCartTotal();
        
    }); 

    //Change quantity
    $(document.body).on('keyup', '.cart-quantity-input', function () {
        var productid = $(this).attr('id');

        if (isNaN($(this).val()) || $(this).val() <= 0 ) {
            alert('Please enter a valid input');

        }
        updateCartTotal()
    });



});

//Remove from Cart
function removefromcart() {
    var productid = localStorage.getItem("productid");


    var url = serverURL() + "/removefromcart.php";

    var JSONObject = {
        "productid": productid,
    };
  

    $.ajax({
        url: url,
        type: 'GET',
        data: JSONObject,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (arr) {
            //_changeAddressResult(arr);
            alert('Removed');
        },
        error: function () {
            alert("FAIL");
        }
    });
}

//Cart Total
function updateCartTotal() {

    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]

        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value;
        total = total + (price * quantity)  
    }
    total = Math.round(total * 100) / 100  
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total


}





