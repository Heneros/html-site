$(document).ready(function(){
        //colors block
    $('.product-tshirt').on('click', '.shape__color', function(){
        $(".img__item").hide();
        var id = $('.product-tshirt .shape__color').index(this);
        $(".img__item").eq(id).show();
    })
    //sizes block
    $('.product-tshirt').on('click', '.active', function(){
        $(".img__item").hide();
        var id = $('.product-tshirt .active').index(this);
        $(".img__item").eq(id).show(); 
    })
});



