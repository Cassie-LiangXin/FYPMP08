
paypal.Buttons({
        createOrder: function(data, actions) {
                    return actions.order.create({
        purchase_units: [
                            {

        amount: {
        currency_code: "USD",
        value: "230.00",
        breakdown: {
        item_total: {
        currency_code: "USD",
        value: "180.00"
                            },
        shipping: {
        currency_code: "USD",
        value: "30.00"
                            },
         handling: {
        currency_code: "USD",
         value: "10.00"
                            },
        tax_total: {
        currency_code: "USD",
         value: "20.00"
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
         tax: {
        currency_code: "USD",
        value: "10.00"
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
        tax: {
        currency_code: "USD",
        value: "5.00"
                            },
        quantity: "2",
         category: "PHYSICAL_GOODS"
                             }
                             ],
       shipping: {
        method: "Singapore Postal Service",
        address: {
        name: {
        full_name:"J",
        surname:"ShopSpree"
                            },
       address_line_1: "123 Orchard St",
         address_line_2: "Floor 6",
          admin_area_2: "Singapore",
          admin_area_1: "SG",
          postal_code: "94107",
         country_code: "SG"
                                    }
                                }
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
