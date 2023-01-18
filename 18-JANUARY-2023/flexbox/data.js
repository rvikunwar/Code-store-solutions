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
        image: 'https://static.wikia.nocookie.net/vsbattles/images/d/df/Arminrender.png/revision/latest?cb=20180419100830',
    },
]


let renderCharacter = document.getElementById("character_list")

const card = ({ image, name, description }) => `<section>
        <img src='${image}'/>
        <h3>${name}</h3>
        <article>${description}</article>
    </section>`


characters.map((item) => {
    renderCharacter.innerHTML += card(item)
    return item;
})
