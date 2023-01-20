const characters = [ 
    {
        name: "Eren Yeager",
        description: "Eren Yeager, named Eren Jaeger in the subtitled and dubbed versions of the anime Attack on Titan, is a fictional character and the protagonist of the Attack on Titan manga series created by Hajime Isayama",
        image: 'https://www.pngmart.com/files/13/Eren-Jaeger-Download-PNG-Image.png',
    },

    {
        name: "Levi Ackerman",
        description: "Levi Ackerman is the tritagonist of the Attack on Titan anime/manga series. He is a captain in the Survey Corps, known to be the strongest soldier alive. He has a harsh and unsocial personality, but is well-regarded by his subordinates and he cares about their lives.",
        image: 'https://www.pngmart.com/files/19/Captain-Levi-Ackerman-PNG-Transparent-Image.png',
    },

    {
        name: "Mikasa Ackerman",
        description: "Mikasa is Eren's childhood friend, along with Armin. Mikasa shares an unbreakable bond with Eren following events in their past, and rushes to protect him whenever he is in danger. Mikasa possesses impressive fighting skill and strength even as a child.",
        image: 'https://static.tvtropes.org/pmwiki/pub/images/mikasa_ackerman_anime_9.png',
    },

    {
        name: "Armin Arlert",
        description: "Armin Arlert is one of the main protagonists of the anime/manga series Attack on Titan. He is a refugee from Shiganshina and Eren Yeager and Mikasa Ackerman's best friend from childhood.",
        image: './images/aot/armin.jpg',
    },
]



const merchandise = [ 
    {
        name: "Eren Yeager",
        description: "Eren Yeager, named Eren Jaeger in the subtitled and dubbed versions of the anime Attack on Titan, is a fictional character and the protagonist of the Attack on Titan manga series created by Hajime Isayama",
        image: './images/merchandise/merch1.jpg',
    },

    {
        name: "Levi Ackerman",
        description: "Levi Ackerman is the tritagonist of the Attack on Titan anime/manga series. He is a captain in the Survey Corps, known to be the strongest soldier alive. He has a harsh and unsocial personality, but is well-regarded by his subordinates and he cares about their lives.",
        image: './images/merchandise/merch2.jpg',
    },

    {
        name: "Mikasa Ackerman",
        description: "Mikasa is Eren's childhood friend, along with Armin. Mikasa shares an unbreakable bond with Eren following events in their past, and rushes to protect him whenever he is in danger. Mikasa possesses impressive fighting skill and strength even as a child.",
        image: './images/merchandise/merch3.jpg',
    },

    {
        name: "Armin Arlert",
        description: "Armin Arlert is one of the main protagonists of the anime/manga series Attack on Titan. He is a refugee from Shiganshina and Eren Yeager and Mikasa Ackerman's best friend from childhood.",
        image: './images/merchandise/merch4.jpg',
    },

    {
        name: "Eren Yeager",
        description: "Eren Yeager, named Eren Jaeger in the subtitled and dubbed versions of the anime Attack on Titan, is a fictional character and the protagonist of the Attack on Titan manga series created by Hajime Isayama",
        image: './images/merchandise/merch5.jpg',
    },

    {
        name: "Levi Ackerman",
        description: "Levi Ackerman is the tritagonist of the Attack on Titan anime/manga series. He is a captain in the Survey Corps, known to be the strongest soldier alive. He has a harsh and unsocial personality, but is well-regarded by his subordinates and he cares about their lives.",
        image: './images/merchandise/merch6.jpg',
    },

    {
        name: "Mikasa Ackerman",
        description: "Mikasa is Eren's childhood friend, along with Armin. Mikasa shares an unbreakable bond with Eren following events in their past, and rushes to protect him whenever he is in danger. Mikasa possesses impressive fighting skill and strength even as a child.",
        image: './images/merchandise/merch7.jpg',
    },

    {
        name: "Armin Arlert",
        description: "Armin Arlert is one of the main protagonists of the anime/manga series Attack on Titan. He is a refugee from Shiganshina and Eren Yeager and Mikasa Ackerman's best friend from childhood.",
        image: './images/merchandise/merch8.jpg',
    },
]


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

merchandise.map((item) => {
    renderMerchandise.innerHTML += card(item)
    return item;
})
