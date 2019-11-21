﻿var ratedIndex = -1;
var uID = 0;


$(document).ready(function () {
    resetStarColors();

    if (localStorage.getItem('ratedIndex') != null)
        setStars(parseInt(localStorage.getItem('ratedIndex')));

    $('.fa-star').on('click', function () {
        ratedIndex = parseInt($(this).data('index'));
        localStorage.setItem('ratedIndex', ratedIndex);
        saveToTheDB();
    });

     


    $('.fa-star').mouseover(function () {
        resetStarColors();
        var currentIndex = parseInt($(this).data('index'));
        setStars(currentIndex);

    });

    $('.fa-star').mouseleave(function () {
        resetStarColors();

        if (ratedIndex != -1)
            setStars(ratedIndex);
    });

});

function saveToTheDB() {
    var url = serverURL() + "/savestars.php";

    $.ajax({
        url: url,
        method: 'POST',
        dataType: 'json',
        data: {
            save: 1,
            uID: uID,
            ratedIndex: ratedIndex
        }, success: function (r) {
            ratedIndex = r.ratedIndex,
            uID = r.uid;
        },
        error: function () {
            alert("FAIL");
        }
    });

}

function setStars(max) {
    for (var i = 0; i <= max; i++)
        $('.fa-star:eq(' + i + ')').css('color', 'green');
}



function resetStarColors() {
    $('.fa-star').css('color', 'white');
}