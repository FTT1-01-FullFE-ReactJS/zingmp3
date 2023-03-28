$('.gallery').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
    nextArrow: '<div class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>'

});
$('.list-item-2').slick({
  infinite: true,
  slidesToShow: 7,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 1000,
});