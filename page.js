$(function () {

    $(window).scroll(changeHeaderColor);

    //function top nav

    $('.fa-bars').on('click', function (e) {
        e.preventDefault();
        var menu = $('#myMenu');

        if ($('#myMenu').hasClass('responsive')) {
            menu.removeClass('responsive');
            $('.full-name').removeClass('hidden');
            $('.show-name').removeClass('hidden');
        } else {
            menu.addClass('responsive');
            $('.full-name').addClass('hidden');
            $('.show-name').addClass('hidden');
        }

    });

//CAROUSEL
    var ulDots = $('#dots');
    ulDots.find('li').click(function () {
        var index = $('#dots li').index(this);
        ulDots.find('li').removeClass('active');
        $(this).addClass('active');



    });

    var indexOfLast = $('.image-carousel').length - 1;
    var dots = $('ul#dots li');
    moveOutSetInterval = moveInterval(indexOfLast, dots);

    $('#dots li').on('click', function(){
        clearInterval(moveOutSetInterval);
        var _this = $(this);
        var selectedImg = $('.image-carousel.img0'+$(this).index());//+':not(.out)');
        $('.image-carousel').removeClass('pivot');

        if ( selectedImg.prevAll().length == 0 ) {
            selectedImg.addClass('pivot');
        } else {
            $('.image-carousel:eq(0)').addClass('pivot');
        }

        selectedImg.nextAll().each(function (index, el) {
            moveOut($(el), outTransitionTime, dots, _this);
        });

        moveOutSetInterval = moveInterval(indexOfLast, dots);
    });


});

var moveOutSetInterval;
var displayingTime = 4000;
var outTransitionTime = 1000;
var gapTime = 200;

function changeHeaderColor() {
    var breakpoint = $(window).scrollTop() >= $('main').offset().top - 60;//60: is the height of the green bar
    if (breakpoint) {
        $('header').addClass('change-header');
    } else {
        $('header').removeClass('change-header');
    }
}


function moveOut(el, time, dots, mydot) {
    el.addClass('out');
    dots.removeClass('active');
    var indexActive = parseInt( getClassImg(el).split('img')[1] );

    if ( mydot ) {
        mydot.addClass('active');
    } else {
        dots.eq( (++indexActive) % dots.length ).addClass('active');
    }

    setTimeout(function () {
        if ( mydot ){
            el.removeClass('out').insertBefore(".image-carousel.pivot");
        } else {
            el.removeClass('out').prependTo(".carousel-inner");
        }

    }, time + gapTime );


}


function moveInterval(indexOfLast, liDots){
    return setInterval(function () {
        $('.image-carousel').removeClass('pivot');
        moveOut($('.image-carousel').eq(indexOfLast), outTransitionTime, liDots);
    }, displayingTime);
}


function getClassImg(el) {
    return $(el).attr('class').replace(/.*\s(img[0-9]{2})\s.*/g, '$1');
}