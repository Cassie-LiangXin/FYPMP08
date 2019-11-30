var customerid = 0;
$(document).ready(function () {

    GET_Order();
    getCustomerId();

    function GET_Order() {
        var useremail = localStorage.getItem("customer_email");
        var url = "https://bitmp08.projectsbit.org/MobileApp/getorders.php";

        $.ajax({

            url: url,
            method: 'POST',
            data: { GET_Order: 1 },
            success: function (response) {
                console.log(response);
                var resp = jQuery.parseJSON(JSON.stringify(response));
                var responselength = resp.message.length;

                if (resp.status === 1) {
                    var OrdersContent = '';
                    var statuscheck = "UnPaid";
                    $.each(resp.message, function (index, value) {

                        if (localStorage.getItem("customer_id") === value.customer_id) {
                            //alert(value.orders_code);
                            OrdersContent += '<tr><td>$ ' +
                                value.orders_final_amount
                                + '</td><td>' +
                                value.orders_payment_status
                                + '</td><td>' +
                                value.orders_date
                                + '</td><td>';

                        }
                        if (statuscheck === value.orders_payment_status) {
                            //alert(value.orders_code);
                            OrdersContent +=
                                // '<button id="' + value.orders_code + '" class="btn btn-success btn-view" type="button">Thank You</button>' +

                                '<button value="' + value.orders_code + '"   id="' + value.orders_final_amount + '" class="btn btn-success btn-pay" type="button">Pay</button>' +
                                '<button id="' + value.orders_code + '" class="btn btn-danger btn-delete" type="button">Cancle</button>' + '</td></tr>'
                                ;
                        } else if (statuscheck !== value.orders_payment_status) {
                            OrdersContent +=

                                '<button id="' + value.orders_code + '" class="btn btn-success btn-view" type="button">Thank You</button></td></tr>';

                            //'<button id="' + value.orders_final_amount + '" class="btn btn-success btn-pay" type="button">Pay</button>' +
                            // '<button name="' + value.orders_final_amount + '" id="' + value.orders_code + '" class="btn btn-danger btn-delete" type="button">Cancle</button>' + '</td></tr>'
                            
                        }

                    });
                    $(".Orders").html(OrdersContent);
                }
            }
        });
    }


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
            error: function () {
                alert("FAIL");
            }
        });
    }

    function _getgetCustomerIdResult(arr) {
        customer_id = arr[0].customer_id;
        localStorage.setItem("customer_id", customer_id);
        //alert(customer_id);
    }

    //Execute Remove Order
    $(document.body).on('click', '.btn-delete', function () {

        var buttonClicked = event.target;
        buttonClicked.parentElement.remove();
        var order_id = $(this).attr('id');

        localStorage.setItem("orders_code", order_id);
        removefromcart();
        alert(' order Removed');

        window.location.reload();


    });

    $(document.body).on('click', '.btn-pay', function () {

        var buttonClicked = event.target;
        //buttonClicked.parentElement.remove();
        var orders_final_amount = $(this).attr('id');
        var orders_code = document.getElementById(orders_final_amount);

        localStorage.setItem("orders_final_amount", orders_final_amount);
        localStorage.setItem("orders_code", orders_code.value);
        window.location.href = "payment.html";


    });





});

//Remove from Cart
function removefromcart() {
    var orders_code = localStorage.getItem("orders_code");


    var url = serverURL() + "/removefromorder.php";

    var JSONObject = {
        "orders_code": orders_code
    };


    $.ajax({
        url: url,
        type: 'GET',
        data: JSONObject,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (arr) {
            //_changeAddressResult(arr);
            alert(' Order Removed');

            window.location.reload();
            //window.location.href = "shoppingcart.html";  

        },
        error: function () {
            alert("FAIL");
        }
    });
}

function getdate() {
    d = new Date();
    var day = d.getDay();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var getdates = "" + day + "/" + month + "/" + year + "";
    getdates = getdates.toString();
    localStorage.setItem("getdates", getdates);
}

function UpdateOrder() {

    var url = "https://bitmp08.projectsbit.org/MobileApp/createorder.php";
    var result;
    getdate();
    //for database var 


    var orders_date = localStorage.getItem("getdates");
    alert(orders_date);
    var orders_voucher_applied = localStorage.getItem("voucher_code");
    var orders_discount_amount = localStorage.getItem("voucher_amount_deducted");
    var orders_final_amount = localStorage.getItem("totalamount");
    var orders_payment_date = "";
    var orders_payment_status = localStorage.getItem("orders_transaction_status");
    var orders_points_allocated = Math.round(orders_final_amount);
    var customer_id = localStorage.getItem("customer_id");
    var orders_total_amount = orders_discount_amount + orders_final_amount;

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
        "customer_id": customer_id
    };



    $.ajax({
        url: url,
        type: 'GET',
        data: JSONObject,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (arr) {
            // _getaddcartResult(arr);
            alert("Order success!");
        },
        error: function () {
            alert("fail");
        }
    });

}

function makePurchase() {
    var orderamount = localStorage.getItem("totalamount");
    var falsevalue = 0;


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

        } //alert(OrderArray);
        localStorage.setItem("OrderArray", OrderArray);
        uploadOrder();
        //window.location.reload();



        window.location.href = "orders.html";
    } else {
        alert("Please Choose at least one item");
    }
}
