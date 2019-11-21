(function () {

     
    var customer_username =  localStorage.getItem("customer_username")
    var customer_first_name = localStorage.getItem("customer_first_name")
    var customer_last_name = localStorage.getItem("customer_last_name")
    var customer_date_of_birth = localStorage.getItem("customer_date_of_birth")
    var customer_pic = localStorage.getItem("customer_pic")

          

    

            document.getElementById("txtFirstName").innerHTML = customer_first_name
            document.getElementById("txtLastName").innerHTML = customer_last_name
            document.getElementById("DOB").innerHTML = customer_date_of_birth
 
})();