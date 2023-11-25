//  Initialize Swiper
var swiper = new Swiper('.cardSwiper', {
    speed: 400,
    slidesPerView: 2,
    spaceBetween: 30,
    autoplay: false,
    loop: true,
    breakpoint: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        800: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1200: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
    }
})