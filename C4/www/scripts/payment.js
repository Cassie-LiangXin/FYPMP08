var orders_final_amount = localStorage.getItem("orders_final_amount");
var ordersummary = '';
ordersummary += '$' + orders_final_amount + '';
//alert(ordersummary);
$('#ordersummary').append(ordersummary);

paypal.Buttons({
    createOrder: function (data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: orders_final_amount
                }
            }]
        });
    },
    onApprove: function (data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function (details) {
            // This function shows a transaction success message to your buyer.
            alert('Transaction completed by ' + details.payer.name.given_name);
            UpdateOrder();
        });
    }
}).render('#paypal-button-container');
  //This function displays Smart Payment Buttons on your web page.




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

    var url = "https://bitmp08.projectsbit.org/MobileApp/payingorder.php";
    var result;
    getdate();
    //for database var 


    var orders_date = localStorage.getItem("getdates");
    alert(orders_date);

    var orders_payment_status = "Paid";
    var orders_code = localStorage.getItem("orders_code");
    alert(orders_code);
    var JSONObject = {
 
        "orders_date": orders_date,
        "orders_payment_status": orders_payment_status,
        "orders_code": orders_code
    };



    $.ajax({
        url: url,
        type: 'GET',
        data: JSONObject,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (arr) {
            // _getaddcartResult(arr);
            alert("Payment Success!");

            window.location.href = "orders.html";
        },
        error: function () {
            alert("fail");
        }
    });

}