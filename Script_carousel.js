
$(document).ready(function(){

    $("#carousel_ul li:first").before($("#carousel_ul li:last"));

    $("#right_scroll").click(function(){

        var width=$("#carousel_ul li").outerWidth()+10;

        var left= parseInt($("#carousel_ul").css("left"))-width;
       
        $("#carousel_ul:not(:animated)").animate({"left":left},300,function(){

            $("#carousel_ul li:last").after($("#carousel_ul li:first"));

            $("#carousel_ul").css({"left":"-370px"});

        });
    });

$("#left_scroll").click(function(){

    var width=$("#carousel_ul li").outerWidth()+10;

        var left = parseInt($("#carousel_ul").css("left"))+width;
        $("#carousel_ul:not(:animated)").animate({"left":left},300,function(){

            $("#carousel_ul li:first").before($("#carousel_ul li:last"));

            $("#carousel_ul").css({"left":"-370px"});

        });
    });

});


