function index() {
    window.location = "index.html";
}

function lol() {
    window.location = "index.html";
}

function profile() {
    window.location = "profile.html";
}
function products() {
    window.location = "productlisting.html";
}

function contact() {
    window.location = "contact.html";
}
function shoppingcart() {
    window.location = "shoppingcart.html";
}
function payment() {
    window.location = "payment.html";
}
function chatbot() {
    window.location = "chatbot.html";
}
function augmentedreality() {
    window.location = "augmentedreality.html";
}

function serverURL() {
    return "https://bitmp08.projectsbit.org/MobileApp/";
}

function goBack() {
    window.history.back()
}

function validationMsgs(message, title, button) {
    navigator.notification.alert(
        message,
        function () { },
        title,
        button
    );
}




function validationMsg() {
    validationMsgs("Unable to connect to server. Please try again later.", "Connection Problem", "OK");
}




















/*function validationMsgs(message, title, button) {
    navigator.notification.alert(
        message,
        function () { },
        title,
        button
    );
}


function validationMsg() {
    validationMsgs("Unable to connect to server. Please try again later.", "Connection Problem", "OK");
}*/




















