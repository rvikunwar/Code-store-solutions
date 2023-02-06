//initializing swiper object
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});
var renderTables = document.getElementById("table_list");
function card(_a) {
    var image = _a.image, name = _a.name, description = _a.description;
    return ("<section>\n            <img src='".concat(image, "'/>\n            <h3>").concat(name, "</h3>\n            <article>").concat(description.substring(0, 130), " . . .</article>\n            <button id='").concat(name, "' onclick=\"bookTable('").concat(name, "')\">Book table</button>\n        </section>"));
}
tables.map(function (item) {
    if (renderTables != null) {
        renderTables.innerHTML += card(item);
        return item;
    }
});
window.addEventListener("scroll", function () {
    var content = document.querySelectorAll(".animated-content");
    content.forEach(function (item) {
        var rect = item.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 1.5) {
            item.classList.add("in-view");
        }
        else {
            item.classList.remove("in-view");
        }
    });
});
