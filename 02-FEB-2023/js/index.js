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
function renderMessage(message, color) {
    var toaster = document.getElementById("toaster");
    var toasterMsg = document.getElementById("toaster-message");
    if (toaster !== null && toasterMsg !== null) {
        toaster.style.display = "block";
        toaster.style.backgroundColor = color;
        toaster.classList.add('fadeAnimation');
        toasterMsg.textContent = message;
        setTimeout(function () {
            if (toaster !== null) {
                toaster.style.display = 'none';
                toaster.classList.remove('fadeAnimation');
            }
        }, 2000);
    }
}
