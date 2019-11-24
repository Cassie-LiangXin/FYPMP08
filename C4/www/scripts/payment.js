
paypal.Buttons({
        createOrder: function(data, actions) {
                    return actions.order.create({
        purchase_units: [
                            {

        amount: {
        currency_code: "USD",
        value: "170.00",
        breakdown: {
        item_total: {
        currency_code: "USD",
        value: "180.00"
                            },
        shipping: {
        currency_code: "USD",
        value: "00.00"
                            },


        shipping_discount: {
        currency_code: "USD",
          value: "10"
                           }
                           }
                          },
        items: [
         {
         name: "T-Shirt",
         description: "Green XL",
         sku: "sku01",
         unit_amount: {
        currency_code: "USD",
         value: "90.00"
                            },

        quantity: "1",
        category: "PHYSICAL_GOODS"
                            },
                            {
        name: "Shoes",
        description: "Running, Size 10.5",
        sku: "sku02",
        unit_amount: {
        currency_code: "USD",
        value: "45.00"
                            },
        quantity: "2",
         category: "PHYSICAL_GOODS"
                             }
                             ]

                            }
                        ]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
        alert('Transaction completed by ' + details.payer.name.given_name);
    // Call your server to save the transaction
    return fetch('/api/paypal-transaction-complete', {
        method: 'post',
                            headers: {
        'content-type': 'application/json'
                            },
                            body: JSON.stringify({
        orderID: data.orderID
                            })
                        });
                    });
                }
            }).render('#paypal-button-container');
