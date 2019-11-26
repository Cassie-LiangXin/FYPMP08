var sum = 0;
var items = 0;
var discountamount = 0;
var zero = 0;
localStorage.setItem("voucher_amount_deducted", zero);
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
                            items = items + 1;
                            ProductContent +=                              
                                '<tr class="cart-row"><div class="cart-row" >'+
                                    '<td><input type="checkbox" class="myCheck"  onclick="updateCartTotal()"></td><td><div class="cart-item cart-column">'+
                                        '<img class="cart-item-image" src="https://bitmp08.projectsbit.org/product_images/' + value.product_picture + '" width="100" height="100">' +
                                        ''+
                                    '</div><span class="cart-item-title">' + value.product_name +'</span></td>'+

                            '<td><input id="' + value.product_id + '" class="cart-quantity-input" type="number" value="1"></td>'+

                                        '<td><div class="cart-quantity cart-column">'+
                            '<span class="cart-price cart-column">$' + value.product_price +'</span>' +
                                         '<button id="' + value.product_id + '" class="btn btn-danger btn-delete" type="button">REMOVE</button>'+
                                         '</div></td>'+
                                '</div></tr>';

                           //sum = sum + parseInt(value.product_price);
                           
                             document.getElementsByClassName('cart-total-price')[0].innerText = '$' + sum;
                        }
                    });                    
                    $(".cart-items").html(ProductContent);
                }
            }
        });
    }
    updateCartTotal();

        
    //Execute Remove
    $(document.body).on('click', '.btn-delete', function () {

        var buttonClicked = event.target;
        buttonClicked.parentElement.remove();
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
        updateCartTotal();
    });
    //Get Voucher
    $(document.body).on('click', '.submitvoucher', function () {
        // var vouchercode = $(this).attr('value');
        //var voucherdiv = document.getElementsByClassName('voucher');
        var vouchercode = document.getElementById("vouchercode");
        var voucherval = vouchercode.value;
        
        localStorage.setItem("vouchercode", voucherval);
        varifyvoucher();
        
    });

  

});
//varify voucher
function varifyvoucher() {
    var varifyvouchercode = localStorage.getItem("vouchercode");
  
    
    var url = serverURL() + "/varifyvoucher.php";

    var JSONObject = {
        "varifyvouchercode": varifyvouchercode
    };


    $.ajax({
        url: url,
        type: 'GET',
        data: JSONObject,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (arr) {
            //get and save voucher id 
            //get and save voucher value;
           // alert('true');
            _getvarifyvoucherResult(arr);
        },
        error: function () {
            alert("Please Enter Correct Voucher Code");
        }
    });
}
function _getvarifyvoucherResult(arr) {
    localStorage.setItem("voucher_id", arr[0].voucher_id);
    localStorage.setItem("voucher_amount_deducted", arr[0].voucher_amount_deducted);
    updateCartTotal();
    if (arr[0].result.trim() !== "0") {
        
      
        var test = localStorage.getItem("voucher_amount_deducted");
       
        
        /*validationMsgs("Login OK", "Information", "OK");*/
        //updateCartTotal();
    }
    else {
        alert("Please Enter Correct Voucher Code");
        localStorage.setItem("voucher_id", zero);
        localStorage.setItem("voucher_amount_deducted", zero);
    }
}
//Remove from Cart
function removefromcart() {
    var productid = localStorage.getItem("productid");


    var url = serverURL() + "/removefromcart.php";

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
            //_changeAddressResult(arr);
            alert('Removed');
            
            window.location.reload();
            //window.location.href = "shoppingcart.html";  
            
        },
        error: function () {
            alert("FAIL");
        }
    });
}

//Cart Total
function updateCartTotal() {

    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
   // alert(items);
     //alert("cartrows"+ cartRows.length);
     for (var i = 0; i < cartRows.length; i++) {
         var cartRow = cartRows[i];
         var checkBox = cartRow.getElementsByClassName('myCheck')[0];

        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];

        
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        if (checkBox.checked === true) {
             total += price * quantity;
         } 

 
    }
     total = Math.round(total * 100) / 100;
     total = total - discountamount;
     discountamount = localStorage.getItem("voucher_amount_deducted");
   
       var discountcheck = "undefined";
        var badvalue = 0;
        if (discountamount === discountcheck) { discountamount = badvalue; }
        
        if (total < 0) { total = badvalue; }
     document.getElementsByClassName('discount-price')[0].innerText = '$' + discountamount;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
localStorage.setItem("totalamount", total);

}


  function makeorder() {
      var orderamount = localStorage.getItem("totalamount");
      var falsevalue = 0;
      

      if (orderamount > falsevalue) {
          window.location.href = "payment.html";  
      } else {
          alert("Please Choose at least one item");
      }
      
    
    // window.location.href = "payment.html";  
       //
   
    }


