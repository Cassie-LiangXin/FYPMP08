(function () {

    $(document).on("pagebeforecreate", function () {
        printheader();
    });

    $(document).ready(function () {
        $("#SearchForm").validate({
            messages: {
                txtSearchTerm: "enter search term"
            },
            focusInvalid: false,
            submitHandler: function () {
                return false;
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().after());
            },
        });

        $("#btnSearchFriend").bind("click", function () {
            if ($("#SearchForm").valid()) {
                searchfriend();
            }
        });
    });

    function searchfriend() {
        var url = serverURL() + "/MobileApp/search.php";

        var JSONObject = {
            "search": $("#txtSearchTerm").val()
        };

        $.ajax({
            url: url,
            type: 'GET',
            data: JSONObject,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                _getSearchResult(arr);
            },
            error: function () {
                validationMsg();
            }
        });
    }

    function _getSearchResult(arr) {

        var t;

        if ($.fn.dataTable.isDataTable('#searchresult')) {
            t = $('#searchresult').DataTable();
        }
        else {
            t = $('#searchresult').DataTable({
                "searching": false,
                "lengthChange": false
            });
        }

        t.clear();
        for (var i = 0; i < arr.length; i++) {
            t.row.add([
                arr[i].product_title,
                //"<img width='60' height='60' src='" +  "https://bitmp08.projectsbit.org/product_images/" + arr[i].product_image + "'>",
                arr[i].product_price, arr[i].product_desc,
                "<a href='#' class='ui-btn' id='btn" + arr[i].product_desc + "'>add to cart</a>"
            ]).draw(false);

            $("#btn" + arr[i].product_title).bind("click", { id: arr[i].product_title }, function (event) {
                var data = event.data;
                showfriend(data.id);
            });

        }
        $("#searchresult").show();
    }

    function showfriend(userid) {
        window.location = "showuser.html?userid=" + userid;
    }

})();