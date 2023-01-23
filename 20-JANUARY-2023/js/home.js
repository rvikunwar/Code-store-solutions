let renderCharacter = document.getElementById("character_list")

const card = ({ image, name, description }) => `<section>
        <img src='${image}' class='img-filter'/>
        <h3>${name}</h3>
        <article>${description.substring(0, 130)} . . .</article>
        <button>Read more</button>
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



let renderMerchandise = document.getElementById("merchandise_list")

const merchandiseCard = ({ image, name, description }) => `<section>
        <img src='${image}' class='img-filter'/>
        <h3>${name}</h3>
        <article>${description.substring(0, 130)} . . .</article>
        <button>Check out</button>
    </section>`

merchandise.map((item) => {
    renderMerchandise.innerHTML += merchandiseCard(item)
    return item;
})
