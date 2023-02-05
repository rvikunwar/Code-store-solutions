const characters = [ 
    {
        name: "Tables for All Occasions",
        description: "Looking for the perfect table for your special occasion? [Restaurant Name] has tables to suit all needs, from intimate dinner parties to large gatherings. Our warm and welcoming atmosphere, combined with delicious food and exceptional service, will make your event unforgettable. Book your table today and let us make your occasion a celebration to remember.",
        image: 'https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/2020-09/Outsidedining.jpg?itok=lFHMZ-bF',
    },

    {
        name: "Reserve Your Table Today",
        description: " Whether you're looking for a romantic dinner for two or a celebration with friends and family, [Restaurant Name] is the perfect place for you. Our menu features an array of delicious dishes, expertly prepared by our skilled chefs. We offer a comfortable and relaxed atmosphere, with impeccable service to match. Book your table now and experience dining at its finest.",
        image: 'https://d1k571r5p7i4n1.cloudfront.net/c.1818/large/restaurants_good_for_groups_Homepage.jpg',
    },

    {
        name: "Dine in Style",
        description: "Come and experience the perfect blend of delicious food, elegant surroundings, and impeccable service at [Restaurant Name]. Our menu features a range of dishes, from classic favorites to innovative new creations, all expertly crafted by our talented chefs. Reserve your table now and indulge in a memorable dining experience.",
        image: 'https://femina.wwmindia.com/content/2020/jun/farm-01-thumb1591162275.jpg',
    },

    {
        name: "Your Next Dining Destination",
        description: "Discover the perfect dining experience at [Restaurant Name]. From our delicious food to our warm and welcoming atmosphere, every aspect of our restaurant has been carefully crafted to provide you with a memorable dining experience. Book your table today and treat yourself to a meal that you won't forget.",
        image: 'https://ak.picdn.net/offset/photos/6013168e6f52af4409fc9a88/medium/offset_1084474.jpg',
    },
]



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

let renderCharacter = document.getElementById("table_list")

const card = ({ image, name, description }) => `<section>
        <img src='${image}'/>
        <h3>${name}</h3>
        <article>${description.substring(0, 130)} . . .</article>
        <button id='${name}' onclick="bookTable('${name}')">Book table</button>
    </section>`


characters.map((item) => {
    renderCharacter.innerHTML += card(item)
    return item;
})


window.addEventListener("scroll", function() {
    var content = document.querySelectorAll(".animated-content");
    content.forEach((item, index) => {
        var rect = item.getBoundingClientRect();
        if (rect.top <= window.innerHeight/1.5) {
            item.classList.add("in-view");
        } else{
            item.classList.remove("in-view");
        }
    })
});

