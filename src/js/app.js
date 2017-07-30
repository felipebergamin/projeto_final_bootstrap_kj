$(function (){

    $('html,body').on('click', function (event) {
        if(event.target === document.documentElement)
            $('html').removeClass('show-sidebar');
    });

    $('.open-sidebar').on('click', function(event) {
        $('html').addClass('show-sidebar');
    });
});