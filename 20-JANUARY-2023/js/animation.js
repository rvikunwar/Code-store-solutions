var navbar = document.querySelector(".animated-navbar");

window.onscroll = function() {
    if (window.pageYOffset > 0) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
};


var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});


var images = document.querySelectorAll('.img-filter');

images.forEach((item) => {
    item.addEventListener('mouseout', function() {
        this.style.filter = 'grayscale(100%)';
    });
      
    item.addEventListener('mouseover', function() {
        this.style.filter = 'grayscale(0%)';
    });
})
