var scr = document.getElementsByTagName("script")[9]; 
var value = 666.00;
// assuming that this <script> is first <script> on this page
scr.setAttribute("data-amount", value);