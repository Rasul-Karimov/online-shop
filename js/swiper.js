
const swiper = new Swiper('.slider-main__wrapper', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 32,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,

    pagination: {
        el: '.slider-main .swiper-pagination',
        clickable: true,
    },

    // Navigation arrows 
    navigation: {
        nextEl: '.slider-main .slider-arrow__next',
        prevEl: '.slider-main .slider-arrow__prev',
    },


})



const swiperRooms = new Swiper('.slider-rooms__body', {
    observer: true,
    observeParents: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,

    pagination: {
        el: '.slider-rooms .slider-rooms__dotts',
        clickable: true,
    },

    // Navigation arrows 
    navigation: {
        nextEl: '.slider-rooms .slider-arrow__next',
        prevEl: '.slider-rooms .slider-arrow__prev',
    },

    breakpoint: {
        480: {
            slidesPerView: 1,
        }
    }
})



const swiperTips = new Swiper('.tips__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 40,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,
    centeredSlides: true,
    pagination: {
        el: '.tips__block-slider .tips__dotts',
        clickable: true,
    },

    // Navigation arrows 
    navigation: {
        nextEl: '.tips__block-slider .slider-arrow__next',
        prevEl: '.tips__block-slider .slider-arrow__prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        650: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
    }
})