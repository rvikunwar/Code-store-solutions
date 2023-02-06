//initializing swiper object
let swiper = new Swiper(".mySwiper", {
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

let renderTables = document.getElementById("table_list") as HTMLElement;

function card({ image, name, description }): string{
    return (
        `<section>
            <img src='${image}'/>
            <h3>${name}</h3>
            <article>${description.substring(0, 130)} . . .</article>
            <button id='${name}' onclick="bookTable('${name}')">Book table</button>
        </section>`)
}


tables.map((item) => {
    if(renderTables != null){
        renderTables.innerHTML += card(item)
        return item;
    }
})


window.addEventListener("scroll", function() {
    var content = document.querySelectorAll(".animated-content");
    content.forEach((item) => {
        var rect = item.getBoundingClientRect();
        if (rect.top <= window.innerHeight/1.5) {
            item.classList.add("in-view");
        } else{
            item.classList.remove("in-view");
        }
    })
});

