var sum = 0;
var items = 0;
var discountamount = 0;
var voucherid = 0;
var voucher_code = "";
var nothing = "";
var zero = 0;
var badvalue = 0;
var OrderArray = [];
var discountcheck = "undefined";
var orders_transaction_status = "UnPaid";
var goodstatus = 1;
$(document).ready(function () {
    localStorage.setItem("voucher_amount_deducted", zero);
    localStorage.setItem("orders_transaction_status", orders_transaction_status);
    GET_ShoppingCart();
    getCustomerId();
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
                            '<td><input type="checkbox" class="myCheck" id="' + value.product_id + '"  onclick="updateCartTotal()"></td><td><div class="cart-item cart-column">'+
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

    function getCustomerId() {
        var url = serverURL() + "/getprofile.php";

        var JSONObject = {
            "customer_username": localStorage.getItem("customer_username"),
            "customer_email": localStorage.getItem("customer_email")

        };

        $.ajax({
            url: url,
            type: 'GET',
            data: JSONObject,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                _getgetCustomerIdResult(arr);
            },
            error: function (arr) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (arr.status === 404) {
                    msg = 'Requested page not found. [404]';
                } else if (arr.status === 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + arr.response;
                }
                alert(msg);
            }
        });
    }

    function _getgetCustomerIdResult(arr) {
        customer_id = arr[0].customer_id;
        localStorage.setItem("customer_id", customer_id);
    }  
    //Execute Remove
    $(document.body).on('click', '.btn-delete', function () {

        var buttonClicked = event.target;
        buttonClicked.parentElement.remove();
            var productid = $(this).attr('id');
            localStorage.setItem("productid", productid);
            removefromcart();
            alert(' item Removed');

            window.location.reload();
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

            _getvarifyvoucherResult(arr);
        },
        error: function (arr) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (arr.status === 404) {
                msg = 'Requested page not found. [404]';
            } else if (arr.status === 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + arr.response;
            }
            alert(msg);
        }
    });
}
function _getvarifyvoucherResult(arr) {
    localStorage.setItem("voucher_id", arr[0].voucher_id);
    localStorage.setItem("voucher_code", arr[0].voucher_code);
    localStorage.setItem("voucher_amount_deducted", arr[0].voucher_amount_deducted);
    checkvoucher();
    updateCartTotal();
    
    if (arr[0].result.trim() !== "0") {
        var test = localStorage.getItem("voucher_amount_deducted");
    }
    else {
        alert("Please Enter Correct Voucher Code");
        localStorage.setItem("voucher_id", zero);
        localStorage.setItem("voucher_amount_deducted", zero);
    }
}
function checkvoucher() {
    discountamount = localStorage.getItem("voucher_amount_deducted");
    voucherid = localStorage.getItem("voucher_id");
    voucher_code = localStorage.getItem("voucher_code");
    if (discountamount === discountcheck) { discountamount = badvalue; voucher_code = nothing; }
    if (voucherid === discountcheck) { voucherid = badvalue; }
    if (voucher_code === discountcheck) { voucher_code = nothing; }
    localStorage.setItem("discountamount", discountamount);
    localStorage.setItem("voucherid", voucherid);
    localStorage.setItem("voucher_code", voucher_code);

  
}
//Remove from Cart
function removefromcart() {
    var productid = localStorage.getItem("productid");

    var url = serverURL() + "/removefromcart.php";

    var JSONObject = {
        "productid": productid,
        "customer_email": localStorage.getItem("customer_email")
    };  

    $.ajax({
        url: url,
        type: 'GET',
        data: JSONObject,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (arr) {

        },
        error: function (arr) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (arr.status === 404) {
                msg = 'Requested page not found. [404]';
            } else if (arr.status === 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + arr.response;
            }
            alert(msg);
        }
    });
}
//Cart Total
function updateCartTotal() {

    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

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

      discountamount = localStorage.getItem("voucher_amount_deducted");
   
       var discountcheck = "undefined";
        var badvalue = 0;
        if (discountamount === discountcheck) { discountamount = badvalue; }
        checkvoucher();
        if (total < 0) { total = badvalue; }
    }
     total = Math.round(total * 100) / 100;
     localStorage.setItem("orders_total_amount", total );
     total = total - discountamount;

     if (total < 0) { total = badvalue; }
     document.getElementsByClassName('discount-price')[0].innerText = '$' + discountamount;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
localStorage.setItem("totalamount", total);

}

function goShop() { window.location.href = "productlisting.html"; }

function getdate() {
    d = new Date();
    var day = d.getDay();
    var month = d.getMonth()+ 1;
    var year = d.getFullYear();
    var getdates = "" + day + "/" + month + "/" + year + "";
    getdates = getdates.toString();
    localStorage.setItem("getdates", getdates);
}
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   // alert(result);
    localStorage.setItem("orders_code", result);

    
   
}


function uploadOrder() {
    var url = "https://bitmp08.projectsbit.org/MobileApp/createorder.php";
    var result;
    getdate();
    makeid(5);  
    var orders_date = localStorage.getItem("getdates");
    var orders_voucher_applied = localStorage.getItem("voucher_code");
    var orders_discount_amount = localStorage.getItem("voucher_amount_deducted");
    var orders_final_amount = localStorage.getItem("totalamount");
    var orders_payment_date = "";
    var orders_payment_status = localStorage.getItem("orders_transaction_status");
    var orders_points_allocated = Math.round(orders_final_amount);
    var customer_id = localStorage.getItem("customer_id");
    var orders_total_amount = localStorage.getItem("orders_total_amount");
    var orders_code = localStorage.getItem("orders_code");
    
    var JSONObject = {
        "OrderArray": OrderArray,
        "orders_date": orders_date,
        "orders_total_amount": orders_total_amount,
        "orders_voucher_applied": orders_voucher_applied,
        "orders_discount_amount": orders_discount_amount,
        "orders_final_amount": orders_final_amount,
        "orders_payment_date": orders_payment_date,
        "orders_payment_status": orders_payment_status,
        "orders_points_allocated": orders_points_allocated,
        "customer_id": customer_id,
        "orders_code": orders_code
    };

    
    $.ajax({
        url: url,
        type: 'GET',
        data: JSONObject,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (arr) {
            alert("Order success!");
            window.location.href = "orders.html";
        },
        error: function (arr) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (arr.status === 404) {
                msg = 'Requested page not found. [404]';
            } else if (arr.status === 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + arr.response;
            }
            alert(msg);
        }
    });
 
}
function makeorder() {
    var orderamount = localStorage.getItem("totalamount");
    var falsevalue = 0;
    checkvoucher();
    if (orderamount > falsevalue) {
        var cartItemContainer = document.getElementsByClassName('cart-items')[0];
        var cartRows = cartItemContainer.getElementsByClassName('cart-row');
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i];
            var checkBox = cartRow.getElementsByClassName('myCheck')[0];
            if (checkBox.checked === true) {
                OrderArray.push(checkBox.id);
                localStorage.setItem("productid", checkBox.id);
                removefromcart();
            }                   
        } 
        localStorage.setItem("OrderArray", OrderArray);
        uploadOrder();
        localStorage.setItem("voucher_code", nothing);
    } else {
        alert("Please Choose at least one item");
    }
}
