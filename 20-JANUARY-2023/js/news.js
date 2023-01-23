
let renderNews = document.getElementById("stories_list")

const card = ({ title, desc }) => `<section class='news-card'>
        <h3>${title}</h3>
        <article>${desc}</article>
    </section>`


news.map((item) => {
    renderNews.innerHTML += card(item)
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

